import { useState } from "react";
import styles from "./Login.module.css";
import { useEffect } from "react"; //carrega assim que a pagina for executada
import { Link } from "react-router-dom";
// Biblioteca para conectar com API
import axios from "axios";

function Testar() {
  return (
    <>
      <div className={styles.container}>
        <form>
          <span>Login</span>

          <div>
            <label>Usuário</label>
            <input
              type="text"
              name="login"              
              
              required
            />
           
          </div>

          <div>
            <label>Senha</label>
            <input
              type="password"
              name="senha"            
             
              required
            />
        
          </div>         

    
        </form>
      </div>
   
    </>
  );
}

export default Testar;
