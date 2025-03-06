import style from "./Header.module.css";
import {Link} from 'react-router-dom';

function Header() {
  return (
    <>
      <header className={style.header}>
        <Link to="/">
          <span>Otymus.dev</span>
        </Link>

        <nav>
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
