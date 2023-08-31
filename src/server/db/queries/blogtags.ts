import { Query } from '..'
import { BlogTags } from '../../../types';

const createBlogTag = (BlogTag: BlogTags) => Query('INSERT INTO BlogTags SET ?', [BlogTag]);

const deleteByBlogId = (id: BlogTags['blog_id']) => Query('DELETE FROM BlogTags WHERE blog_id=?', [id]);

export default {
    createBlogTag,
    deleteByBlogId,
}