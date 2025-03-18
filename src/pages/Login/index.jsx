"use client"; // Necessário para rodar em Client Component
import { useState, useContext } from "react";
import { FaUser, FaLock } from "react-icons/fa"; // Icones importados da biblioteca material UI
import style from "../Login/Login.module.css";
import { useNavigate } from "react-router-dom";
import api from "../../services/api.js";
import Cookies from "js-cookie";
import { AuthContext } from "../../Context/AuthContext.jsx";


function LoginTeste() {
    const navigate = useNavigate();
    const [login, setLogin] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const autenticacao = async (e) => {
        e.preventDefault();
         
        try {
            const response = await api.post("/login", { login, senha });  
            //console.log(nome)  
            console.log(response.data)        

            if (response.data) {

                Cookies.set("token", response.data,{expires:1});
                console.log(response.data)
                navigate("/home"); // Redireciona após login
            } else {
                setError("Erro ao autenticar. Verifique suas credenciais.");
            }
        } catch (err) {
            setError(err.response?.data?.error || "Erro de conexão. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className={style.container}>
                <form className={style.formulario} onSubmit={autenticacao}>
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

                    <div className={style.labels}>
                        <label>
                            <input type="checkbox" />
                            Lembre de mim
                        </label>
                        <a href="#">Esqueceu a senha?</a>
                    </div>

                    <button type="submit">Entrar</button>

                    <div className={style.registro}>
                        <p>
                            Não tem uma conta? <a href="#">Registrar</a>
                        </p>
                    </div>
                </form>
            </div>
        </>
    );
}

export default LoginTeste;
