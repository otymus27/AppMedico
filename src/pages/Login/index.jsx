"use client"; // Necessário para rodar em Client Component
import { useState, useContext } from "react";
import { FaUser, FaLock } from "react-icons/fa"; // Icones importados da biblioteca material UI
import style from "../Login/Login.module.css";
import { useNavigate } from "react-router-dom";
import api from "../../services/api.js";
import Cookies from "js-cookie";
import { AuthContext } from "../../Context/AuthContext.jsx";
import ErrorBoundary from "../../componentes/ErrorBoundary/index.jsx";


function LoginTeste() {
    // Aqui recebemos variaveis e funções vindas do AuthContext, que podem ser usadas em qualquer componente
    const { logar } = useContext(AuthContext);
    const navigate = useNavigate();
    const [login, setLogin] = useState("");
    const [senha, setSenha] = useState("");
       

    //Função para logar, está puxando a função logar do useContext, no caso AuthContext.jsx
    const entrar = async (e) => {
        e.preventDefault();
        try {
            await logar(login, senha);  // Tenta logar o usuário
            navigate("/home");          // Redireciona se o login for bem-sucedido
        } catch (error) {
            console.error("Erro ao autenticar:", error);
            // Talvez exibir uma mensagem de erro para o usuário
        }
    };



    return (
        <>
            {/* ErrorBoundary -serve para capturar qualquer erro de renderização de componentes */}
                      
                <div className={style.container}>
                    <form className={style.formulario} onSubmit={entrar}>
                        <h1>Acesse o sistema</h1>
                        
                        <div className={style.inputfield}>
                            <input
                                type="text"
                                name="login"
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                                placeholder="Informe o login"
                                required
                            />
                            <FaUser className={style.icon} />
                        </div>
                       
                        
                        <div className={style.inputfield}>                      
                            <input
                                type="password"
                                name="senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                placeholder="Informe a senha"
                                required
                            />                     
                            <FaLock className={style.icon} />
                        </div>
                           
                        <button type="submit">Entrar</button>                  
                        
                    </form>
                </div>
           
        </>
    );
}

export default LoginTeste;
