import {useEffect} from "react";
import {useNavigate} from "react-router-dom"
import useAuth from "./utils/useAuth";

const RequireAuth = ({children}) => {
    const {user} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user === null) {
            navigate("/login")
        }
    }, [user, navigate])

    return children
}

export default RequireAuth
