import { Query } from "..";
import { Tags, NewTag } from "../../../types";

const getAllTags = () =>
Query<Tags[]>('SELECT * FROM Tags');

const getOneTag = (id: Tags['id']) =>
Query<Tags[]>('SELECT * FROM Tags WHERE id=?', [id]);

const createTag = (name: string) =>
Query('INSERT INTO Tags (name) VALUE (?)', [name]);

const updateTag = (id: Tags['id'], name: Tags['name']) =>
Query('UPDATE Tags SET name=? WHERE id=?', [name, id]);

const deleteTag = (id: Tags['id']) =>
Query('DELETE FROM Tags WHERE id=?', [id]);

const searchByTag = (name: NewTag['name']) =>
Query<NewTag[]>('SELECT * FROM Tags WHERE name=?', [name]);

export default {
    getAllTags,
    getOneTag,
    createTag,
    updateTag,
    deleteTag,
    searchByTag
}