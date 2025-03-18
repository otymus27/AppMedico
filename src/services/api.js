import axios from 'axios';
import Cookies from "js-cookie";


/// Função para facilitar a conexão com o backend da aplicação
const api = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
      'Content-Type': 'application/json',
      // 'Authorization': localStorage.getItem("token") || ''
  },
});

//Interceptor para adicionar o token a cada requisição
api.interceptors.request.use(
  (config) => {
      const token = Cookies.get("token");
      if (token) {
          config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
  },
  (error) => {
      console.error("Erro na requisição:", error);
      return Promise.reject(error);
  }
);

export default api;