import axios from "axios";

const updateUser = async (user) => {
    const response = await axios.put('/user', user)
    return response.data
}

const createUser = async (user) => {
    const response = await axios.post("/user", user)
    return response.data
}

export {updateUser, createUser}
