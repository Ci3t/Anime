import axios from "axios";

let myUrl = 'http://localhost:5000/api';

if (process.env.NODE_ENV === 'production') {
    myUrl = '/api';
}


const client = axios.create({baseURL:myUrl})

export default client