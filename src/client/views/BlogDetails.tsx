import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BlogsWithContext } from "../../types";
import { GET } from "../services/fetcher-helper";
import BlogCard from "../components/BlogCard";

const BlogDetails = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState<BlogsWithContext>();

    useEffect(() => {
        GET(`/api/blogs/${id}`).then(setBlog);
    }, [id]);

    return (
        <div className="row justify-content-center">
            <h1 className="d-flex justify-content-center pt-2">Blog #{id}</h1>
            {blog && (
                <BlogCard
                    isDetails
                    blog={blog}
                />
            )}
        </div>
    );
};

export default BlogDetails;
