import * as express from "express";
import blogRouter from "./blogs";
import tagRouter from "./tags";
import authorRouter from "./authors";
import donateRouter from "./donate";

const router = express.Router();

router.use("/api/blogs", blogRouter);
router.use("/api/tags", tagRouter);
router.use("/api/authors", authorRouter);
router.use("/api/donate", donateRouter);

export default router;
