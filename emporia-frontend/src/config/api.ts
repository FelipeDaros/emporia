import axios from "axios"
const api = axios.create({
  baseURL: import.meta.env.VITE_URL_API,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': '*',
  },
});


export { api }
