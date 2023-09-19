import * as express from "express";
import { CreateableAuthors } from "../../../types";
import Authors from "../../db/queries/author";

const router = express.Router();

router.post("/", async (req, res) => {
    const { name, email } = req.body as { name: CreateableAuthors["name"]; email: CreateableAuthors["email"] };
    if (
        !name ||
        typeof name !== "string" ||
        name.length > 64 ||
        !email ||
        typeof email !== "string" ||
        email.length > 128
    ) {
        res.status(400).json({ message: "Invalid name or email", name, email });
        return;
    }

    try {
        const results = await Authors.createAuthor({ name, email });
        const id = results.insertId;

        res.status(201).json({ message: `Successfully created Author #${id}.`, id });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Cannot create this Author." });
    }
});

export default router;
