import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";import axios from "axios";
import api from "../services/api.js";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null); // Criando o hook para estados 
    const [medico, setMedico] = useState(null); // Criando o hook para estados 
    const navigate = useNavigate(); // Criando o hook para navegação
    const [loading, setLoading] = useState(true); // Adicionando estado de carregamento
    
    // Verificar a presença do token ao carregar a aplicação
    useEffect(() => {
        const token = Cookies.get("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser(decoded);  // Define o usuário com as informações do token
            } catch (error) {
                console.error("Erro ao decodificar o token:", error);
                setUser(null);
                logout();  // Token inválido, forçar logout
            }
        }else{
            // Se não houver token, forçar logout
            logout();
        }

        setLoading(false); // Carregamento finalizado
    }, []);


    // Funçao para logar puxando dados do banco
    const logar = async (login, senha) => {
        
        try {                         
            const response = await api.post("/login", { login, senha });   
      
            if (response.data && response.data.token) {
                Cookies.set("token", response.data.token,{expires:1});               
                // Decodificar e armazenar os dados do token
                const decoded = jwtDecode(response.data.token);                
                setUser(decoded);
                setMedico(response.data.token)
                alert("Login realizado com sucesso!");                
            } else {
                console.log("Erro ao autenticar. Verifique suas credenciais.");
            }
        } catch (err) {
            console.log(err.response?.data?.error || "Erro de conexão. Tente novamente.");
        } 
    }

    // Função para fazer logout, pode ser chamada de qualquer componente da aplicação
    const logout = () => {        
        Cookies.remove("token");  // Remover o token corretamente
        setUser(null);  // Limpar o estado do usuário
        navigate("/");  // Redirecionar para a página de login
    };

    if (loading) {
        return <p>Carregando...</p>; // Renderiza algo enquanto carrega
    }

    return (
        <AuthContext.Provider value={{ user, logout, logar }}>
            {children}
        </AuthContext.Provider>
    );
}