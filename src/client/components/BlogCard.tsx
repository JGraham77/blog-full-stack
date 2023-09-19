import React from "react";
import { BlogsWithContext } from "../../types";
import { Link } from "react-router-dom";

const BlogCard = ({ blog, isDetails }: { blog: BlogsWithContext; isDetails?: boolean }) => {
    return (
        <div className="col-12 p-3">
            <div className="card shadow-lg">
                <div className="card-title">
                    <div className="card-header text-primary bg-white display-4 border-bottom-0">{blog.title}</div>
                    <h4 className="card-header bg-white border-primary display-6 border-3">By: {blog.author}</h4>
                </div>
                <div className="card-body">
                    <p>
                        <em>
                            {blog.tags.map((t, i) => (
                                <span
                                    key={`tags-span-${i}`}
                                    className="mx-1"
                                >
                                    #<strong>{t}</strong>
                                </span>
                            ))}
                        </em>
                    </p>
                    {blog.content.length > 100 && (
                        <p>{isDetails ? blog.content : `${blog.content.substring(0, 100)}...(see more)`}</p>
                    )}
                    {blog.content.length <= 100 && (
                        <p>{isDetails ? blog.content : `${blog.content.substring(0, 100)}`}</p>
                    )}
                    <hr className="border border-primary border-1 opacity-75" />
                    <p>Blog created at: {blog.created_at}</p>
                    {!isDetails && (
                        <Link
                            className="btn btn-primary"
                            to={`/blogs/${blog.id}`}
                        >
                            Blog #{blog.id}
                        </Link>
                    )}
                    {isDetails && (
                        <Link
                            className="btn btn-info"
                            to={`/blogs/${blog.id}/edit`}
                        >
                            More info Blog #{blog.id}
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
