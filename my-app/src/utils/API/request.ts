import axios, {Method} from 'axios';
//const axios = require('axios'); // legacy way

// Make a request for a user with a given ID
interface APIRequestType {
    method?: Method,
    url?: string
}

// @ts-ignore
export const APIRequest = async ({method, url}: APIRequestType) => {
    try {
        const response = await axios({method: method || 'GET', url});
        // handle success
        console.log(response);
        return response;
    } catch (error) {
        // handle error
        console.log(error);
    } finally {
    }
}
