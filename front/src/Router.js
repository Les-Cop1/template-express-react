import React from "react";
import {Routes, Route} from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Unknown from "./pages/Unknown";

const Router = () => (
    <Routes>
        <Route element={<Layout />}>
            <Route index element={<Home />}/>
            <Route path="*" element={<Unknown />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
    </Routes>
)

export default Router
