import React, {useEffect, useState} from "react"
import AuthContext from "../contexts/AuthContext"
import PropTypes from "prop-types";
import {isLoggedIn, login, logout} from "../api/auth";

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(undefined)

    const signin = (username, password) => {
        login(username, password).then((data) => {
            const {success, username, role, error} = data

            if (success === true) {
                setUser({username, role})
            } else {
                console.log("Unable to connect", error)
            }
            return success
        })
    };

    const signout = () => {
        return () => {
            logout().then(({success}) => {
                if (success === true) {
                    setUser(null)
                }
            })
        }
    };

    useEffect(() => {
        isLoggedIn().then(({username, role}) => {
            setUser({
                username,
                role
            })
        }).catch(() => {
            setUser(null)
        })
    }, [])

    const value = { user, signin, signout };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.element.isRequired
}

export default AuthProvider
