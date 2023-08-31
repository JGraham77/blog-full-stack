import * as dotenv from 'dotenv';

dotenv.config();

export const sqlconfig = {
    'user': process.env.DBUser,
    'password': process.env.DBPassword,
    'host': process.env.DBHost,
    'database': process.env.DBDatabase
};