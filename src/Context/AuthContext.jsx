import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    // Carregar usuário do armazenamento ao iniciar
    useEffect(() => {
        const storedUser = Cookies.get("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Função para fazer login
    const login = (userData) => {
        setUser(userData);
        Cookies.set("user", JSON.stringify(userData), { expires: 1 }); // 1 dia de validade
    };

    // Função para fazer logout
    const logout = () => {
        setUser(null);
        Cookies.remove("user");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}