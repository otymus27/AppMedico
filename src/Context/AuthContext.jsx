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
    

    // Carregar usuário do armazenamento ao iniciar
    useEffect(() => {
        const storedUser = Cookies.get("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);



    // Verificar se o usuário está autenticado ao carregar a aplicação
    useEffect(() => {
        const token = Cookies.get("token");
        
        if (token) {
            const decoded = jwtDecode(token); // Decodificar o token para obter os dados do usuário
            api.get("/medicos")
                .then(response => {
                    setUser({ ...decoded, ...response.data, token }); // Atualiza com os dados do perfil
                })
                .catch(() => {
                    logout(); // Se o token for inválido, realiza o logout
                });
        }
    }, []);

    // Função para fazer login, o parametro desta função está vindo de outro componente, no caso Login.jsx
    const autenticar = (userData) => {
        setUser(userData);
        Cookies.set("user", JSON.stringify(userData), { expires: 1 });
        console.log(userData)
        
    };

    // Funçao para logar puxando dados do banco
    const logar = async (login, senha) => {
        
        try {                         
            const response = await api.post("/login", { login, senha });   
      
            if (response.data && response.data.token) {
                Cookies.set("token", response.data.token,{expires:1});
                //console.log(response.data.token)
                // Decodificar e armazenar os dados do token
                const decoded = jwtDecode(response.data.token);
                //console.log("Dados do token decodificados:", decoded);
                setUser(decoded);
                setMedico(response.data.token)
                alert("Login realizado com sucesso!");
                navigate("/perfil"); // Redireciona após login
            } else {
                console.log("Erro ao autenticar. Verifique suas credenciais.");
            }
        } catch (err) {
            console.log(err.response?.data?.error || "Erro de conexão. Tente novamente.");
        } 
    }

    // Função para fazer logout, pode ser chamada de qualquer componente da aplicação
    const logout = () => {        
        setUser(null); // Limpa o estado do usuário
        Cookies.remove("token"); // Remove o token do cookie
        alert("Sessão encerrada!");
        navigate("/login"); // Redireciona para o login após logout
    };

    return (
        <AuthContext.Provider value={{ user, autenticar, logout, logar }}>
            {children}
        </AuthContext.Provider>
    );
}