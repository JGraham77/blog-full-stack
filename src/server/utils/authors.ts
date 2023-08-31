import Authors from '../db/queries/Authors';

export const getRandomAuthorId = async () => {
    const authors = await Authors.getAllAuthors()
    const author_ids = authors.map(a => a!.id);
    const author_id = author_ids[Math.floor(Math.random() * author_ids.length)];
    return author_id
};