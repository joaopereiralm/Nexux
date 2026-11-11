import axios from 'axios';

// withCredentials: necessário para enviar o cookie HttpOnly de autenticação.
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3333/api',
  withCredentials: true,
});
