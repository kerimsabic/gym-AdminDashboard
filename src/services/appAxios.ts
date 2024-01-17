import axios from 'axios';
import { BASE_URL } from '../utils/data';
const appAxios = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
   /* headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrZXJpbTIiLCJpYXQiOjE3MDU0OTEyMDAsImV4cCI6MTcwNTUyNzIwMH0.PIP31NtxjkEgnSykJUdFGJVn2jLxxshlQachPyH0Zjk"
    }*/
});


export default appAxios;