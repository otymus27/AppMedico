import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext.jsx";
import { userLogged } from "../services/medicoService.js";
import Cookies from "js-cookie";



function Perfil() {
     // Aqui recebemos variaveis e funções vindas do AuthContext, que podem ser usadas em qualquer componente
    const { user, logout } = useContext(AuthContext);
    const id = user.id;

    // Verificação para garantir que o usuário está carregado
     if (!user) {
        navigate("/login");
        return null;
    }

    const [usuario, setUsuario] = useState({}); 

    // Função para buscar dados do usuario logado
    async function buscarUsuarioLogado() {    
      try {
            const response = await userLogged(id);           
            console.log(response);
            setUsuario(response);                         
                       
      } catch (error) {
            console.log(error);
      }
    
    }

    useEffect(() => {
        if(Cookies.get('token'))
        buscarUsuarioLogado();
    }, []);

    return (
        <div>
            <h2>Perfil do usuário</h2>
            {user ? (
                <>
                    <p>Nome: {usuario.nome}</p>
                    <p>ID: {usuario.id}</p>
                    <p>Usuário: {usuario.login}</p>
                    <p>Token: {usuario.token}</p>
                    <button onClick={logout}>Sair</button>
                </>
            ) : (
                <p>Não está logado</p>
                
            )}
        </div>
    );
}

export default Perfil;