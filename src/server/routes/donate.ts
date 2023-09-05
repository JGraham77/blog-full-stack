import * as express from "express";
import Stripe from "stripe";
import { stripeconfig } from "../config";

const stripe = new Stripe(stripeconfig.apiKey, {
    apiVersion: "2023-08-16",
    typescript: true,
});

const router = express.Router();

router.post("/payment-intent", async (req, res) => {
    try {
        const amount = req.body.amount;
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: "USD",
        });
        res.json({
            message: "payment intent created",
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong :(", error });
    }
});

export default router;
