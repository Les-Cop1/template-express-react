import axios from "axios";

const isLoggedIn = async () => {
    const response = await axios.get('/auth')
    return response.data
}

const login = async (username, password) => {
    const response = await axios.post('/auth', {username, password})
    return response.data
}

const logout = async () => {
    const response = await axios.delete('/auth')
    return response.data
}

export {isLoggedIn, login, logout}
