import * as dotenv from "dotenv";

dotenv.config();

export const sqlconfig = {
    user: process.env.DBUser,
    password: process.env.DBPassword,
    host: process.env.DBHost,
    database: process.env.DBDatabase,
};

export const stripeconfig = {
    apiKey: process.env.STRIPE_API_KEY as string,
};
