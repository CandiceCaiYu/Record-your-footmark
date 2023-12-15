import axios, {Method} from 'axios';
//const axios = require('axios'); // legacy way

// Make a request for a user with a given ID
interface APIRequestType {
    method?: Method,
    url?: string,
    data: any
}

// @ts-ignore
export const APIRequest = async ({method, url, data}: APIRequestType) => {
    try {
        const response = await axios({method: method || 'GET', url, data,});
        // handle success
        console.log(response);
        return response;
    } catch (error) {
        // handle error
        console.log(error);
    } finally {
    }
}
