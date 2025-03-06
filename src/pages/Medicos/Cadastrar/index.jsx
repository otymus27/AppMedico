import style from "./Modal.module.css";
import Button from "react-bootstrap/Button";
import { useState, useRef } from "react";
import api from "../../../services/api.js";

function ModalCadastrar({ isOpen, setOpen, atualizarLista }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    // Declarar uma nova variável dados com state e atribuir o objeto
    const [data, setData] = useState({
        nome: "",
        login: "",
        senha: "",
        especialidade: "",
        crm: "",
    });

    // Declarar a variável para receber a mensagem
    const [message, setMessage] = useState("");

    // Receber os dados dos campos do formulário
    const valueInput = (e) =>
        setData({ ...data, [e.target.name]: e.target.value });

    // Executar a função quando o usuário clicar no botão do formulário
    const createUsuario = async (e) => {
        // Bloquear o recarregamento da página
        e.preventDefault();

        // Fazer a requisição para o servidor utilizando axios, indicando o método da requisição, o endereço, enviar os dados do formulário e o cabeçalho
        await api
            .post("http://localhost:3001/medicos", data)
            .then((response) => {
                // Acessa o then quando a API retornar status 200                
                alert("Registro adicionado com sucesso!");   
                atualizarLista(); // Props vinda da pagina Listar para atualizar a lista automaticamente             
                setOpen(false); // Fecha o modal após salvar
                

                // Limpar os dados do state e os dados dos campos do formulário
                setData({
                    nome: "",
                    login: "",
                    senha: "",
                    especialidade: "",
                    crm: "",
                });
            })
            .catch((err) => {
                // Acessa o catch quando a API retornar erro

                // Atribuir a mensagem no state message
                console.log(err.response.data.mensagem);
                if (err.response) {
                    setMessage(err.response.data.mensagem);
                } else {
                    setMessage(
                        "Erro: Tente novamente mais tarde ou entre contato com ...!"
                    );
                }
            });
    };

    if (!isOpen) return null; // Se o modal não estiver aberto, não renderiza nada
    
        return (
            <>
                <div className={style.background}>
                    <div className={style.modal}>
                        <h2>Cadastro de médicos</h2>

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
                                    onClick={() => setOpen(!isOpen)}
                                >
                                    Fechar
                                </Button>
                                
                                <Button
                                    type="submit"
                                    variant="primary"
                                    onClick={(e) => {
                                        createUsuario(e);
                                        setOpen(false);
                                    }}
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
