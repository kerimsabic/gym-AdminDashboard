import axios from 'axios';
import { BASE_URL } from '../utils/data';
const appAxios = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrZXJpbTIiLCJpYXQiOjE3MDUwODA1NzksImV4cCI6MTcwNTEwNDU3OX0.HOIm21CjMrXDG3hjUxvQD0JQjq6dmH-YjbR0rpFDlcw"
    }
});


export default appAxios;