import React from "react";
import { useState } from "react";
import { POST } from "../services/fetcher-helper";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const MAX_NAME = 64;
const MAX_EMAIL = 128;

const CreateAuthor = () => {
    const nav = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleNewAuthor = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        POST("/api/authors", { name, email }).then((data) => {
            Swal.fire(data.message);
            nav(`/`);
        });
    };

    return (
        <div className="row justify-content-center">
            <div className="col-12 col-md-9 col-lg-7">
                <form className="card p-3 shadow-lg mt-3 bg-dark">
                    <h1 className="text-center text-info">New Author</h1>
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Name"
                        maxLength={MAX_NAME}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        className="form-control mt-2"
                        type="email"
                        placeholder="Email"
                        maxLength={MAX_EMAIL}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="d-flex justify-content-end">
                        <button
                            disabled={!name || !email}
                            className="btn btn-info mt-2"
                            onClick={handleNewAuthor}
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateAuthor;
