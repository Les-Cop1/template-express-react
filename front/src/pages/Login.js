import React, {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"
import useAuth from "../utils/useAuth";

const Login = () => {
    document.title = "Login - ProjectName"

    const navigate = useNavigate();
    const {user, signin} = useAuth();

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const onSubmit = () => {
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
        </div>
    )
}

export default Login
