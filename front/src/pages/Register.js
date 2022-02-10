import React, {useEffect, useState} from "react"
import {Link, useNavigate} from "react-router-dom";
import useAuth from "../utils/useAuth";

const Register = () => {
    document.title = "Register - ProjectName"

    const navigate = useNavigate();
    const {user, signup} = useAuth();

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")

    const onSubmit = (e) => {
        e.preventDefault()
        const success = signup(username, password, passwordConfirmation)
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
            <h1>Register</h1>
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
                <input
                    type="password"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                />
                <button type="submit">
                    Login
                </button>
            </form>
            <Link to={"/login"}>Login</Link>
        </div>
    )
}

export default Register
