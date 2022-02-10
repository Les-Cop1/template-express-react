import React, {useEffect, useState} from "react"
import {Link, useNavigate} from "react-router-dom"
import useAuth from "../utils/useAuth";

const Login = () => {
    document.title = "Login - ProjectName"

    const navigate = useNavigate();
    const {user, signin} = useAuth();

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const onSubmit = (e) => {
        e.preventDefault()
        const success = signin(username, password)
        if (success === true) {
            navigate("/")
        }
    }

    useEffect(() => {
        if (user !== null) {
            navigate("/")
        }
    }, [user, navigate])

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">
                    Login
                </button>
            </form>
            <Link to={"/register"}>Register</Link>
        </div>
    )
}

export default Login
