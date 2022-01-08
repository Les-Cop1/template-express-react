import React from "react";
import RequireAuth from "../RequireAuth";
import {Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <RequireAuth>
            <Outlet />
        </RequireAuth>
    )
}

export default Layout
