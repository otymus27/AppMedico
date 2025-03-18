import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

function Login() {
    const { autenticar } = useContext(AuthContext);
    const [login, setLogin] = useState("");
    const [senha, setSenha] = useState("");
    const navigate = useNavigate();

    //Função para logar
    const handleLogin = () => {
          // Simulação de login
          const userData = { login, token: "12345" };

          // Puxando a função do AuthContext, função essa que posso puxar de qualquer componente, pois trata do hook useContext
          autenticar(userData);

          if(login=='otymus'&& senha=='123'){
               alert("Login realizado com sucesso!");
               navigate("/perfil"); // Redireciona após login para pagina indicada
          }else{
               alert("Senha ou login inválidos!!!")
          }
        
    };

    return (
        <div>
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Usuário"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
            />
            <input
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
            />
            <button onClick={handleLogin}>Entrar</button>
        </div>
    );
}

export default Login;