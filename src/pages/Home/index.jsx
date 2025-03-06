import { Link } from "react-router-dom";
import Footer from "../../componentes/Footer/index.jsx";
import Header from "../../componentes/Header/index.jsx";
import Container from "../../componentes/Container/index.jsx";
import style from '../Home/Home.module.css';

function Home({}) {
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