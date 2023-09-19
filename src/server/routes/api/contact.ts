import * as express from "express";
import Mailgun from "mailgun.js";

import { mailgunconfig } from "../../config";

// The way in the walkthrough wouldn't work for me, had to do this for it to actually work
// import FormData from "form-data"
const formData = require("form-data");

const mailgun = new Mailgun(formData).client({
    username: "api",
    key: mailgunconfig.apiKey,
});

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const newEmail = { ...req.body };
        const results = await mailgun.messages.create(mailgunconfig.domain, {
            to: mailgunconfig.toEmail,
            subject: newEmail.subject,
            from: newEmail.from,
            html: `<h1 style="color: black">${newEmail.message}</h1>`,
        });
        res.json(results);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred", error });
    }
});

export default router;
