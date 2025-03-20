import { Link, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import Footer from "../../componentes/Footer/index.jsx";
import Header from "../../componentes/Header/index.jsx";
import Container from "../../componentes/Container/index.jsx";
import style from '../Home/Home.module.css';
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext.jsx";

function Home({}) {
  // Aqui recebemos variaveis e funções vindas do AuthContext, que podem ser usadas em qualquer componente
  const { user, logout } = useContext(AuthContext);
  const id = user.id;
  console.log(id);
  const navigate = useNavigate();

   if (!user) {
       return <navigate to="/login" />;
   }


  return (
    <>
    
      <Header />
      
      
      <Container>

        <section className={style.h}>
          <div className={style.apresentacao}>
            <p>
              Olá, sou <br />
              <span>
                Fabio Rocha <br />
              </span>
            
              Dev Full Stack
            </p>

            <Link to="/sobre" className={`${style.btn} ${style.btn_red}`}>Saiba mais sobre mim</Link>
          </div>

          <figure>
            <img className={style.img_home} src="/img-01.svg" alt="Imagem de Home" />
          </figure>
        </section>

      </Container>

      <Footer/>
    
    </>
  )
}

export default Home