import Footer from "../../componentes/Footer";
import Header from "../../componentes/Header";
import Container from "../../componentes/Container";
import style from "./Page404.module.css";

function Page404() {
  return (
    <>


      <Container>
        <Header/>
        <h2 className={style.titulo2}>Algo de errado não está certo!!!</h2>

        <div className={style.div_textos}>
          <span className={style.texto_grande}>404 <br /></span>
          <strong className={style.texto_vermelho}>Página Não Localizada</strong>
        </div>

        <div className={style.caixa1}>
          <h1>teste</h1>
        </div>

        <Footer/>
      </Container>




    </>
  );
}

export default Page404;
