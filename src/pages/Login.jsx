import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";


function Login() {
    // Aqui recebemos variaveis e funções vindas do AuthContext, que podem ser usadas em qualquer componente
    const { autenticar,logar } = useContext(AuthContext);

    const [login, setLogin] = useState("");
    const [senha, setSenha] = useState("");

    const navigate = useNavigate();

    //Função para logar
    const handleLogin = () => {
          // Simulação de login
          // Aqui passamos os parametros necessários para função de autenticação
          const userData = { login, token: "12345",nome:"fabio" };

          // Puxando a função do AuthContext, função essa que posso puxar de qualquer componente, pois trata do hook useContext
          autenticar(userData);

          if(login=='otymus'&& senha=='123'){
               alert("Login realizado com sucesso!");
               navigate("/perfil"); // Redireciona após login para pagina indicada
          }else{
               alert("Senha ou login inválidos!!!")
          }
        
    };



    //Função para logar
    const entrar = async () => {
        // Puxando a função do AuthContext, função essa que posso puxar de qualquer componente, pois trata do hook useContext
        const credenciais = await logar(login, senha);     
      
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
            <button onClick={entrar}>Login com banco</button>
        </div>
    );
}

export default Login;