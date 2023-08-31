import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="bg-primary p-2 d-flex">
            <NavLink
                to={"/"}
                className="btn btn-success m-2 text-white"
                end
            >
                Home
            </NavLink>
            <NavLink
                to={"/blogs"}
                className="btn btn-success m-2 text-white"
                end
            >
                All Blogs
            </NavLink>
            <NavLink
                to={"/createauthor"}
                className="btn btn-success m-2 text-white"
                end
            >
                New Author
            </NavLink>
        </div>
    );
};

export default Navbar;
