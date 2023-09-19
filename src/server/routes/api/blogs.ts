import * as express from "express";
import Blogs from "../../db/queries/blogs";
import BlogTags from "../../db/queries/blogtags";
import { BlogTagSelect, BlogsWithContext, SingleBlogWithContext } from "../../../types";
import { getRandomAuthorId } from "../../utils/authors";
import { handleBlogTags } from "../../utils/blogtags";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const rawBlogs = await Blogs.getAllBlogs();
        const cleaned: BlogsWithContext[] = rawBlogs.map((rb) => ({ ...rb, tags: rb.tags?.split(",") || [] }));
        res.json(cleaned);
    } catch (error) {
        res.status(500).json({ message: error.sqlMessage || error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const [rawBlog] = await Blogs.getOneBlog(id);
        const cleaned: SingleBlogWithContext = {
            ...rawBlog,
            tags: rawBlog.tags?.split(",") || [],
            tag_ids: rawBlog.tag_ids?.split(",").map((id) => parseInt(id)),
        };
        res.json(cleaned);
    } catch (error) {
        res.status(500).json({ message: error.sqlMessage || error.message });
    }
});

router.post("/", async (req, res) => {
    const { title, content, tags } = req.body as { title: string; content: string; tags: BlogTagSelect[] };
    if (
        !title ||
        typeof title !== "string" ||
        title.length > 64 ||
        !content ||
        typeof content !== "string" ||
        content.length > 65_535
    ) {
        res.status(400).json({ message: "Invalid title or content", title, content });
        return;
    }

    try {
        const author_id = await getRandomAuthorId();
        const results = await Blogs.createBlog(author_id, title, content);
        const id = results.insertId;
        await handleBlogTags({ id, blogTags: tags });

        res.status(201).json({ message: `Successfully created blog post #${id}.`, id });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Cannot create this blog post." });
    }
});

router.put("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const { title, content, tags } = req.body as { title: string; content: string; tags: BlogTagSelect[] };

    if (
        !title ||
        typeof title !== "string" ||
        title.length > 64 ||
        !content ||
        typeof content !== "string" ||
        content.length > 65_535
    ) {
        res.status(400).json({
            message:
                "Invalid content/title or title greater than 64 characters or content greater than 65,535 characters",
        });
        return;
    }

    try {
        await handleBlogTags({ id, blogTags: tags, isUpdate: true });
        await Blogs.updateBlog(title, content, id);
        res.status(201).json({ message: `Successfully edited blog post #${id}.` });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Cannot edit this blog post." });
    }
});

router.delete("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await BlogTags.deleteByBlogId(id);
        await Blogs.deleteBlog(id);
        res.status(200).json({ message: "Successfully deleted blog" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Cannot delete this blog post." });
    }
});

export default router;
