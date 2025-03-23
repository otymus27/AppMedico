import style from "./Modal.module.css";
import Button from "react-bootstrap/Button";
import { useState, useRef } from "react";
import api from "../../../services/api.js";

function ModalCadastrar({ isOpen, setOpen, atualizarLista }) {
  
    // Declarar uma nova variável dados com state e atribuir o objeto
    const [data, setData] = useState({
        nome: "",
        login: "",
        senha: "",
        especialidade: "",
        crm: "",
    });

    // Declarar a variável para receber a mensagem de erro            
    const [erro, setErro] = useState("");

    // Receber os dados dos campos do formulário
    const valueInput = (e) =>
        setData({ ...data, [e.target.name]: e.target.value });

    // Executar a função quando o usuário clicar no botão do formulário
    const createUsuario = async (e) => {
        e.preventDefault(); // Bloquear o recarregamento da página
        setErro(""); // Limpa o erro antes de tentar novamente
        

        // Verificar se todos os campos obrigatórios estão preenchidos
        if (!data.nome || !data.login || !data.senha || !data.especialidade || !data.crm) {
            setErro("Todos os campos são obrigatórios!");
            return; // Impede o envio da requisição para o backend
        }

        try {
            await api.post("/medicos/", data);
            alert("Registro adicionado com sucesso!");
            atualizarLista(); // Atualiza a lista automaticamente
            setOpen(false); // Fecha o modal após salvar

            // Limpar os dados do state e os campos do formulário
            setData({
                nome: "",
                login: "",
                senha: "",
                especialidade: "",
                crm: "",
            });

            // Limpar a mensagem de erro
            setErro("");
            setOpen(false); // Fecha o modal após o sucesso
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setErro(error.response.data.message);
            } else {
                setErro("Erro ao cadastrar usuário. Tente novamente.");
            }
        }
    };

    if (!isOpen) return null; // Se o modal não estiver aberto, não renderiza nada
    
        return (
            <>
                <div className={style.background}>
                    <div className={style.modal}>
                        <h2>Cadastro de médicos</h2>

                        {erro && <p style={{ color: "red" }}>{erro}</p>}   
                        <form className={style.form} onSubmit={createUsuario}>
                            <input
                                type="text"
                                name="nome"
                                placeholder="Preencha o nome do usuário"
                                onChange={valueInput}
                                value={data.nome}
                            />
                            <input
                                type="text"
                                name="login"
                                placeholder="Digite o login"
                                onChange={valueInput}
                                value={data.login}
                            />
                            <input
                                type="password"
                                name="senha"
                                placeholder="Digite a senha"
                                onChange={valueInput}
                                value={data.senha}
                            />
                            <input
                                type="text"
                                name="especialidade"
                                placeholder="Digite a especialidade"
                                onChange={valueInput}
                                value={data.especialidade}
                            />
                            <input
                                type="text"
                                name="crm"
                                placeholder="Digite o crm"
                                onChange={valueInput}
                                value={data.crm}
                            />
                            <div className={style.botao}>
                                <Button
                                    variant="secondary"
                                    onClick={() => setOpen(false)}
                                >
                                    Fechar
                                </Button>
                                
                                <Button
                                    type="submit"
                                    variant="primary"                                    
                                >
                                    Cadastrar
                                </Button>
                            </div>
                        </form>
                       
                    </div>
                </div>
            </>
        );
    
}

export default ModalCadastrar;
