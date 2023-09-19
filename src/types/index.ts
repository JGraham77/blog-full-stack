export interface NewBlog {
    title: string;
    content: string;
    author_id: Authors["id"];
}

export interface Blogs extends NewBlog {
    id: number;
    created_at: Date;
}

export interface CreateableAuthors {
    name: string;
    email: string;
    password?: string;
}

export interface Authors extends CreateableAuthors {
    id: number;
    created_at: Date;
}

export interface NewTag {
    name: string;
}

export interface Tags extends NewTag {
    id: number;
    created_at: Date;
}

export interface BlogTags {
    blog_id: Blogs["id"];
    tag_id: Tags["id"];
}

export interface RawJoined {
    id: Blogs["id"];
    author: Authors["name"];
    title: Blogs["title"];
    content: Blogs["content"];
    created_at: Blogs["created_at"];
}

export interface BlogsWithContext extends RawJoined {
    tags: string[];
}

export interface SingleBlogWithContext extends BlogsWithContext {
    tag_ids: number[];
}

export interface RawWithContext extends RawJoined {
    tags: string;
}

export interface RawWithIds extends RawWithContext {
    tag_ids: string;
}

export interface BlogTagSelect {
    value: number;
    label: string;
    __isNew__?: boolean;
}

export interface MysqlResponse {
    affectedRows: number;
    insertId: number;
}
