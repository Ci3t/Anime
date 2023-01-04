import axios from "axios";

// if(process.env.NODE_ENV ){
//     return baseURL = '/api'
// }
const client = axios.create({baseURL:'http://localhost:5000/api'})

export default client