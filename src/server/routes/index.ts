import * as express from "express";
import blogRouter from "./blogs";
import tagRouter from "./tags";
import authorRouter from "./authors";
import donateRouter from "./donate";
import contactRouter from "./contact";

const router = express.Router();

router.use("/api/blogs", blogRouter);
router.use("/api/tags", tagRouter);
router.use("/api/authors", authorRouter);
router.use("/api/donate", donateRouter);
router.use("/api/contact", contactRouter);

export default router;
