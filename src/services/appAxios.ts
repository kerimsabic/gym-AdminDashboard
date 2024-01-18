import axios from 'axios';
import { BASE_URL } from '../utils/data';
//const userToken = localStorage.getItem('userToken') || '';
const appAxios = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
  
    headers: {
        "Authorization": `Bearer `
    }
});


export default appAxios;