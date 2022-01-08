import React from "react";
import AuthProvider from "./providers/AuthProvider";
import Router from "./Router";

const App = () => {

    return (
        <AuthProvider>
            <Router />
        </AuthProvider>
    )
}

export default App;
