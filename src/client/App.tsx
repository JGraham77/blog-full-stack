import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Create from "./views/CreateBlog";
import Blogs from "./views/Blogs";
import CreateAuthor from "./views/CreateAuthor";
import BlogDetails from "./views/BlogDetails";
import Edit from "./views/Edit";
import Donate from "./views/Donate";
import Thanks from "./views/Thanks";
import Contact from "./views/Contact";

const App = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <main className="container">
                <Routes>
                    <Route
                        path="/"
                        element={<Create />}
                    />
                    <Route
                        path="/blogs"
                        element={<Blogs />}
                    />
                    <Route
                        path="/blogs/:id"
                        element={<BlogDetails />}
                    />
                    <Route
                        path="/blogs/:id/edit"
                        element={<Edit />}
                    />
                    <Route
                        path="/createauthor"
                        element={<CreateAuthor />}
                    />
                    <Route
                        path="/donate"
                        element={<Donate />}
                    />
                    <Route
                        path="/thankyou"
                        element={<Thanks />}
                    />
                    <Route
                        path="/contact"
                        element={<Contact />}
                    />
                </Routes>
            </main>
        </BrowserRouter>
    );
};

export default App;
