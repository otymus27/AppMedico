import style from "./Header.module.css";
import {Link} from 'react-router-dom';
import Cookies from "js-cookie";
// import { useContext } from "react";
// import { MedicoContext } from "./../../Context/MedicoContext.jsx";

function Header() {
  // const { medico, setMedico } = useContext(MedicoContext);

  // Função para fazer logout
  function logout() {
    Cookies.remove("token");
    //setMedico(undefined);
    navigate("/");
  }

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
