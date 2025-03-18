import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null); // Criando o hook para estados 
    const navigate = useNavigate(); // Criando o hook para navegação
    

    // Carregar usuário do armazenamento ao iniciar
    useEffect(() => {
        const storedUser = Cookies.get("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Função para fazer login, o parametro desta função está vindo de outro componente, no caso Login.jsx
    const autenticar = (userData) => {
        setUser(userData);
        Cookies.set("user", JSON.stringify(userData), { expires: 1 }); // 1 dia de validade
    };

    // Função para fazer logout, pode ser chamada de qualquer componente da aplicação
    const logout = () => {        
        setUser(null);
        Cookies.remove("user");
        alert("Sessão encerrada!");
        navigate("/login"); // Redireciona para o login após logout
    };

    return (
        <AuthContext.Provider value={{ user, autenticar, logout }}>
            {children}
        </AuthContext.Provider>
    );
}