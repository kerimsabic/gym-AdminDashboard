import axios from 'axios';
import { BASE_URL } from '../utils/data';
const appAxios = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrZXJpbTIiLCJpYXQiOjE3MDUzMTkzMzEsImV4cCI6MTcwNTM1NTMzMX0.CP742_LKQgCRZKGyUe7zRVLoQgtU6U009yRUGMghMpA"
    }
});


export default appAxios;