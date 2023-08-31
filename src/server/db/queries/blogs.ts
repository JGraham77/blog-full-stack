import { Query } from '..'
import { Blogs, NewBlog, RawWithContext, RawWithIds } from '../../../types'

const getAllBlogs = () => Query<RawWithContext[]>(`
    SELECT b.id, b.title, b.content, b.created_at, a.name as author, GROUP_CONCAT(t.name) as tags
        FROM Blogs b
        JOIN Authors a ON b.author_id = a.id
        LEFT JOIN BlogTags bt ON bt.blog_id = b.id
        LEFT JOIN Tags t ON t.id = bt.tag_id
    GROUP BY b.id
`)

const getOneBlog = (id: Blogs['id']) => Query<RawWithIds[]>(`
    SELECT b.id, b.title, b.content, b.created_at, a.name as author, GROUP_CONCAT(t.name) as tags, GROUP_CONCAT(t.id) as tag_ids
        FROM Blogs b
        JOIN Authors a ON b.author_id = a.id
        LEFT JOIN BlogTags bt ON bt.blog_id = b.id
        LEFT JOIN Tags t ON t.id = bt.tag_id
        WHERE b.id=?
    GROUP BY b.id
`, [id])

const createBlog = (author_id: NewBlog['author_id'], title: NewBlog['title'], content: NewBlog['content']) => 
Query(`INSERT INTO Blogs (author_id, title, content) VALUES (?, ?, ?)`, [author_id, title, content]);

const updateBlog = (title: Blogs['title'], content: Blogs['content'], id: Blogs['id']) => 
Query('UPDATE Blogs SET title=?, content=? WHERE id=?', [title, content, id]);

const deleteBlog = (id: number) => Query('DELETE FROM Blogs WHERE id=?', [id]);

export default {
    createBlog,
    getAllBlogs,
    getOneBlog,
    updateBlog,
    deleteBlog,
};