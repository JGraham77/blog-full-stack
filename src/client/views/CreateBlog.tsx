import * as React from "react";
import { useEffect, useState } from "react";
import CreatableMulti from "react-select/creatable";
import { MultiValue } from "react-select";
import { useNavigate } from "react-router-dom";
import { Tags, BlogTagSelect } from "../../types";
import { GET, POST } from "../services/fetcher-helper";
import Swal from "sweetalert2";

type BlogTagArr = MultiValue<BlogTagSelect>;

const MAX_CONTENT = 65_535;
const MAX_TITLE = 64;

const Create = () => {
    const nav = useNavigate();
    const [options, setOptions] = useState<BlogTagArr>([]);
    const [tags, setTags] = useState<BlogTagArr>([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        GET("/api/tags").then((data: Tags[]) => {
            setOptions(data.map((t) => ({ value: t.id, label: t.name })));
        });
    }, []);

    const handleBlog = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        POST("/api/blogs", { title, content, tags }).then((data) => {
            Swal.fire(data.message);
            nav(`/blogs`);
        });
    };

    return (
        <div className="row justify-content-center">
            <div className="col-12 col-md-9 col-lg-7">
                <h1 className="text-danger text-center">
                    *Disclaimer*: An Author is chosen at random whenever a new blog is created.
                </h1>
                <form className="card p-4 shadow-lg mt-3 bg-light">
                    <h3 className="text-primary text-center">Tell Us Your Story!</h3>
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Title"
                        maxLength={MAX_TITLE}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <label className="mt-2 text-muted">Blog Tags</label>
                    <CreatableMulti
                        value={tags}
                        onChange={(e) => setTags(e)}
                        isMulti
                        options={options}
                    />
                    <label className="mt-2">
                        {content.length} / {MAX_CONTENT}
                    </label>
                    <textarea
                        className="form-control text-dark"
                        placeholder="Content"
                        maxLength={MAX_CONTENT}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <div className="d-flex justify-content-end">
                        <button
                            disabled={!title || !content}
                            className="btn btn-primary mt-2"
                            onClick={handleBlog}
                        >
                            Blog It
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Create;
