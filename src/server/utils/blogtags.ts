import BlogTags from "../db/queries/blogtags";
import Tags from "../db/queries/tags";
import { Blogs, BlogTagSelect } from "../../types"

interface HandleProps {
    id: Blogs['id']; 
    blogTags: BlogTagSelect[]; 
    isUpdate?: boolean;
}


export const handleBlogTags = async ({id, blogTags, isUpdate}:HandleProps) => {
    if (isUpdate) {
        await BlogTags.deleteByBlogId(id);
    };

    const oldBlogTags = blogTags.filter(t => !t.__isNew__);
    const newBlogTags = blogTags.filter(t => t.__isNew__);

    for await (const bt of oldBlogTags) {
        await BlogTags.createBlogTag({ blog_id: id, tag_id: bt.value as number})
    };

    for await (const bt of newBlogTags) {
        const newBT = await Tags.createTag(bt.label)
         await BlogTags.createBlogTag({ blog_id: id, tag_id: newBT.insertId})
    };
};

// A different way of doing above
        // for await (const bt of blogTags) {
        //     if (bt.__isNew__) {
        //         const newBT = await Tags.createTag(bt.label);
        //         await BlogTags.createBlogTag({ blog_id: id, tag_id: newBT.insertId });
        //     } else {
        //         await BlogTags.createBlogTag({ blog_id: id, tag_id: bt.value as number}); 
        //     }
        // };