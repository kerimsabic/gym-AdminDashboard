import axios from 'axios';
import { BASE_URL } from '../utils/data';
const appAxios = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrZXJpbTIiLCJpYXQiOjE3MDUxNDYzMDAsImV4cCI6MTcwNTE4MjMwMH0.9eTqN-tUYOQFfl9oee9uvqToeoZxgT5JpV-70hRffDE"
    }
});


export default appAxios;