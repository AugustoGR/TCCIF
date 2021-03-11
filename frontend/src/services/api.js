import axios from 'axios';
const api = axios.create({
    baseURL: 'https://localhost:3443',
})
export default api;