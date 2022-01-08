import axios from "axios";

const updateUser = async (user) => {
    const response = await axios.put('/user', user)
    return response.data
}

export {updateUser}
