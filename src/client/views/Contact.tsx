import React, { useState } from "react";
import Swal from "sweetalert2";

const Contact = () => {
    const [data, setData] = useState({
        from: "",
        subject: "",
        message: "",
    });

    const handleChanges = (e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => {
        setData((pre) => ({ ...pre, [e.target.name]: e.target.value }));
    };

    const handleContact = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const msg = await res.json();
            console.log(msg);
            setData({
                from: "",
                subject: "",
                message: "",
            });
        } catch (error) {
            Swal.fire(error);
            console.log(error);
        }
    };

    return (
        <div className="row justify-content-center">
            <div className="col-12 col-md-9 col-lg-7">
                <form className="card p-4 shadow-lg mt-3 bg-light">
                    <h3 className="text-primary text-center">Contact Me!</h3>
                    <label className="mt-2">From:</label>
                    <input
                        className="form-control"
                        type="text"
                        name="from"
                        value={data.from}
                        onChange={handleChanges}
                    />
                    <label className="mt-2">Subject:</label>
                    <input
                        className="form-control"
                        type="text"
                        name="subject"
                        value={data.subject}
                        onChange={handleChanges}
                    />
                    <label className="mt-2">Message:</label>
                    <textarea
                        className="form-control"
                        name="message"
                        value={data.message}
                        onChange={handleChanges}
                    />
                    <button
                        className="btn btn-primary mt-2"
                        onClick={handleContact}
                    >
                        Contact Me
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
