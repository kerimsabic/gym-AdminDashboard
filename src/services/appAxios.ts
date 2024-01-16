import axios from 'axios';
import { BASE_URL } from '../utils/data';
const appAxios = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrZXJpbTIiLCJpYXQiOjE3MDU0MDM2MzcsImV4cCI6MTcwNTQzOTYzN30.LUbAuvosO0_QRKXfGlegRrAbBqV0x_P99S6ojthKpyM"
    }
});


export default appAxios;