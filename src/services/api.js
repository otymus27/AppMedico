import axios from 'axios';


//função para facilitar a conexão com o backend da aplicação
const api = axios.create({
    baseURL: 'http://localhost:3001',
    // headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': sessionStorage.getItem("token") || ''
    //   },
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

export default api;