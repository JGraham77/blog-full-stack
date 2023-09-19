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

export const mailgunconfig = {
    apiKey: process.env.MAILGUN_KEY as string,
    domain: process.env.MAILGUN_DOMAIN as string,
    toEmail: process.env.MAILGUN_TO_EMAIL as string,
};

export const jwtconfig = {
    secret: process.env.JWT_SECRET as string,
    expires: process.env.JWT_EXPIRES,
};
