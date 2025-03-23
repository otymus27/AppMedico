import style from "./Header.module.css";
import {Link} from 'react-router-dom';
import Cookies from "js-cookie";
import { AuthContext } from "../../Context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userLogged } from "../../services/medicoService";
// import { MedicoContext } from "./../../Context/MedicoContext.jsx";

function Header() {
   // Aqui recebemos variaveis e funções vindas do AuthContext, que podem ser usadas em qualquer componente
   const { user, logout } = useContext(AuthContext);
   const id = user.id;
   console.log(id);
   const navigate = useNavigate();

    if (!user) {
        return <navigate to="/login" />;
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
    <>
      <header className={style.header}>
        <Link to="/home">
          <span>{usuario.nome}</span>
        </Link>
       

        <nav>
       
          <Link to="/home">Home</Link>
          <Link to="/medicos">Medicos</Link>
          <Link to="/consultas">Consultas</Link>
          <Link to="/pacientes">Pacientes</Link>          
          <i className="bi bi-box-arrow-right" onClick={logout}></i>
        </nav>
      </header>
    </>
  );
}

export default Header;
