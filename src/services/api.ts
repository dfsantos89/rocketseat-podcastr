import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://protected-river-38501.herokuapp.com'
});