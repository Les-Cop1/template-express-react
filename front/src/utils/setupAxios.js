import axios from "axios";

const setupAxios = () => {
    let baseURL = "/api"

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        baseURL = "http://localhost:2000/api"
    }

    axios.defaults.baseURL = baseURL
    axios.defaults.withCredentials = true
}

export default setupAxios
