import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CreatableMulti from "react-select/creatable";
import { MultiValue } from "react-select";
import { Tags, BlogTagSelect, SingleBlogWithContext } from "../../types";
import { DELETE, GET, PUT } from "../services/fetcher-helper";
import Swal from "sweetalert2";

const MAX_CONTENT = 65_535;
const MAX_TITLE = 64;

type BlogTagArr = MultiValue<BlogTagSelect>;

const Edit = () => {
    const { id } = useParams();
    const nav = useNavigate();
    const [options, setOptions] = useState<BlogTagArr>([]);
    const [tags, setTags] = useState<BlogTagArr>([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");

    useEffect(() => {
        GET(`/api/tags`).then((data: Tags[]) => {
            setOptions(data.map((t) => ({ value: t.id, label: t.name })));
        });
    }, []);

    useEffect(() => {
        GET(`/api/blogs/${id}`).then((data: SingleBlogWithContext) => {
            setTitle(data.title);
            setContent(data.content);
            setAuthor(data.author);
            if (!options.length) return;
            setTags(options.filter(({ value }) => data.tag_ids.includes(value)));
        });
    }, [options]);

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        Swal.fire({
            icon: "question",
            title: "Hello",
            html: `<p>Are you sure you want to delete this blog? Type out the title: '${title}'</p><input type="text" id="title" class="swal2-input" placeholder="${title}">`,
            preConfirm: () => {
                //@ts-ignore
                const results = Swal.getPopup()?.querySelector("#title")?.value;
                if (!results) {
                    Swal.fire("Will not delete.");
                    return;
                }
                return { title: results };
            },
            showConfirmButton: true,
            showDenyButton: true,
        }).then((results) => {
            if (results.value?.title === title) {
                DELETE(`/api/blogs/${id}`).then((data) => Swal.fire(data.message));
                nav("/blogs");
            } else {
                Swal.fire("Will not delete.");
            }
        });
    };

    const handleUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        PUT(`/api/blogs/${id}`, { title, content, tags }).then((data) => {
            Swal.fire(data.message);
            nav(`/blogs/${id}`);
        });
    };

    return (
        <div className="row justify-content-center">
            <div className="col-12 col-md-9 col-lg-7">
                <h1 className="text-center">Editing "{author}'s" blog</h1>
                <form className="card p-4 shadow-lg mt-3 bg-light">
                    <h3 className="text-primary text-center">Editing</h3>
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
                    <div className="d-flex justify-content-between">
                        <button
                            disabled={!title || !content}
                            className="btn btn-success mt-2"
                            onClick={handleUpdate}
                        >
                            Edit
                        </button>
                        <button
                            className="btn btn-danger mt-2"
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Edit;
