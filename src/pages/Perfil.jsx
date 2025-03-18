import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext.jsx";


function Perfil() {
     // Aqui recebemos variaveis e funções vindas do AuthContext, que podem ser usadas em qualquer componente
    const { user, logout } = useContext(AuthContext);
  

    return (
        <div>
            <h2>Perfil</h2>
            {user ? (
                <>
                    <p>Usuário: {user.login}</p>
                    <p>Token: {user.token}</p>
                    <button onClick={logout}>Sair</button>
                </>
            ) : (
                <p>Não está logado</p>
                
            )}
        </div>
    );
}

export default Perfil;