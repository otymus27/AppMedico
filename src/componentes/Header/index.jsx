import style from "./Header.module.css";
import {Link} from 'react-router-dom';
import Cookies from "js-cookie";
import { AuthContext } from "../../Context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// import { MedicoContext } from "./../../Context/MedicoContext.jsx";

function Header() {
   // Aqui recebemos variaveis e funções vindas do AuthContext, que podem ser usadas em qualquer componente
   const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // // Função para fazer logout
  // function sair() {
  //   Cookies.remove("token");
  //   setMedico(undefined);
  //   navigate("/login");
  // }

  return (
    <>
      <header className={style.header}>
        <Link to="/">
          <span>Otymus.dev</span>
        </Link>
       

        <nav>
        <i className="bi bi-box-arrow-right" onClick={logout}></i>
          <Link to="/home">Home</Link>
          <Link to="/medicos">Medicos</Link>
          <Link to="/consultas">Consultas</Link>
          <Link to="/pacientes">Pacientes</Link>
          <Link to="/">Sair</Link>
        </nav>
      </header>
    </>
  );
}

export default Header;
