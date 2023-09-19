import { Query } from "..";
import { Authors, CreateableAuthors, MysqlResponse } from "../../../types";

const getAllAuthors = () => Query<Authors[]>("SELECT * FROM Authors");

const getOneAuthor = (id: Authors["id"]) => Query<Authors[]>("SELECT * FROM Authors WHERE id=?", [id]);

const createAuthor = (newAuthor: CreateableAuthors) => Query("INSERT INTO Authors SET ?", [newAuthor]);

const updateAuthor = (id: Authors["id"], email: Authors["email"]) =>
    Query("UPDATE Authors SET email=? WHERE id=?", [email, id]);

const deleteAuthor = (id: Authors["id"]) => Query("DELETE FROM Authors WHERE id=?", [id]);

const findAuthor = (column: string, value: string) =>
    Query<Authors[]>("SELECT * FROM authors WHERE ??=?", [column, value]);

const insertAuthor = (newAuthor: { email: string; password: string }) =>
    Query<MysqlResponse>("INSERT INTO authors SET ?", [newAuthor]);

export default {
    getAllAuthors,
    getOneAuthor,
    createAuthor,
    updateAuthor,
    deleteAuthor,
    findAuthor,
    insertAuthor,
};
