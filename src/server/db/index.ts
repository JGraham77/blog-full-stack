import * as mysql from "mysql2";
import { sqlconfig } from "../config";

const pool = mysql.createPool(sqlconfig);

export const Query = <T = mysql.ResultSetHeader>(sql: string, values: unknown[] = []) => {
    return new Promise<T>((resolve, reject) => {
        pool.query(sql, values, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data as T);
            }
        });
    });
};
