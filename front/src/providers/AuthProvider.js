import React, {useEffect, useState} from "react"
import AuthContext from "../contexts/AuthContext"
import PropTypes from "prop-types";
import {isLoggedIn, login, logout} from "../api/auth";
import {createUser} from "../api/user";

const AuthProvider = ({children}) => {
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

    const signup = (username, password, passwordConfirmation) => {
        if (password === passwordConfirmation) {
            createUser({username, password}).then((data) => {
                const {success, username, error} = data

                if (success === true) {
                    setUser({username})
                } else {
                    console.log("Unable to create account", error)
                }
                return success
            })
        } else {
            const error = "Password and confirmation not equal"
            console.log(error)
            return {
                success: false,
                error
            }
        }
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

    const value = {user, signin, signup, signout};

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
