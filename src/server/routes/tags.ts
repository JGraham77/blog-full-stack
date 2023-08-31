import * as express from 'express';
import Tags from '../db/queries/tags'

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const all = await Tags.getAllTags();
        res.json(all);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Could not get all Tags' });
    }
})

export default router;