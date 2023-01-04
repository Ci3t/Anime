import axios from "axios";

let baseURL = 'http://localhost:5000/api';

if (process.env.NODE_ENV === 'production') {
    baseURL = 'api';
}


const client = axios.create({baseURL})

export default client