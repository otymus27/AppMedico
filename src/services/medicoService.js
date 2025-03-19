import Cookies from "js-cookie";
import api from "../services/api";

// Rota para pegar o usuário autenticado
export async function userLogged(id) {
     try {
          const token = Cookies.get("token");

          if (!token) {
               throw new Error("Usuário não está autenticado.");
          }

          const response = await api.get(`/medicos/${id}`, {
               headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
               },
          });
          console.log(response.data.token);
          return response.data;
     } catch (error) {
          console.error("Erro ao obter usuário autenticado:", error.response?.data || error.message);
          throw error;
     }
}