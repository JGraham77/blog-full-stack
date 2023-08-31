import React, { useEffect, useState } from "react";
import { BlogsWithContext } from "../../types";
import { GET } from "../services/fetcher-helper";
import BlogCard from "../components/BlogCard";

const Blogs = () => {
    const [blogs, setBlogs] = useState<BlogsWithContext[]>([]);

    useEffect(() => {
        GET("/api/blogs").then(setBlogs);
    }, []);

    return (
        <div className="row justify-content-center">
            <h1 className="text-danger text-center">
                *Disclaimer*: All blogs have an "Author" but each Author is chosen at random at time of creation.
            </h1>
            {blogs.map((blog) => (
                <BlogCard
                    blog={blog}
                    key={`blog-card-${blog.id}`}
                />
            ))}
        </div>
    );
};

export default Blogs;
