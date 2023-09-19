import * as express from "express";
import blogRouter from "./blogs";
import tagRouter from "./tags";
import authorRouter from "./authors";
import donateRouter from "./donate";
import contactRouter from "./contact";

const router = express.Router();

router.use("/blogs", blogRouter);
router.use("/tags", tagRouter);
router.use("/authors", authorRouter);
router.use("/donate", donateRouter);
router.use("/contact", contactRouter);

export default router;
