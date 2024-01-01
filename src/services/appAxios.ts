import axios from 'axios';
import { BASE_URL } from '../utils/data';
const appAxios = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrZXJpbTIiLCJpYXQiOjE3MDQxMDUwMDIsImV4cCI6MTcwNDEyOTAwMn0.-b6fDTpldXjEHKrhiGznfYqM09V9b4bUojNDu8MbJ-g"
    }
});


export default appAxios;