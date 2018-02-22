import axios from "axios";
import { instanceOf } from 'prop-types';
import cookies from 'react-cookies'

class CommonApi {
    
    constructor() {

        this.instance = axios.create({
            baseURL: 'http://192.168.75.131:45455/api/',
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+cookies.load('token')
            }
        });
    }
}

export default (new CommonApi);