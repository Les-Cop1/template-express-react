import axios from "axios";
import {getServerInfo} from "./index";

const serverInfo = getServerInfo()

const fonctionAPI = async () => {
    const response = await axios.post(serverInfo.base_url + '/api/',)
    return response.data
}

export {fonctionAPI}
