import axios from "axios";

const url = () => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        return "http://localhost:3000"
    } else {
        return ""
    }
}
const getServerInfo = () => ({base_url:  url(), credentials: {withCredentials: true}})

export {getServerInfo}
