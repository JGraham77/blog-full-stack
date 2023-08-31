import * as express from 'express';
import blogRouter from './blogs';
import tagRouter from './tags';
import authorRouter from './authors';

const router = express.Router();

router.use('/api/blogs', blogRouter);
router.use('/api/tags', tagRouter);
router.use('/api/authors', authorRouter);

export default router;