import { Modal, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import api from "../../services/api.js";
import { useState } from "react";
import style from "../Modals/Modal.module.css";

const AdicionarModal = ({ show, handleClose, atualizarLista }) => {
    // Declarar uma nova variável dados com state e atribuir o objeto
    const [dados, setDados] = useState({
        nome: "",
        email: "",
        telefone: "",
    });

    // Receber os dados dos campos do formulário
    const valueInput = (e) =>
        setDados({ ...dados, [e.target.name]: e.target.value });

    // Executar a função quando o usuário clicar no botão do formulário
    const cadastrar = async (e) => {
        // Bloquear o recarregamento da página
        e.preventDefault();

        // Fazer a requisição para o servidor utilizando axios, indicando o método da requisição, o endereço, enviar os dados do formulário e o cabeçalho
        await api
            .post("http://localhost:3001/pacientes", dados)
            .then((response) => {
                // Acessa o then quando a API retornar status 200
                alert("Registro adicionado com sucesso!");
                atualizarLista(); // Props vinda da pagina Listar para atualizar a lista automaticamente
                setOpen(false); // Fecha o modal após salvar

                // Limpar os dados do state e os dados dos campos do formulário
                setDados({
                    nome: "",
                    email: "",
                    telefone: "",
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

    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
            backdrop="static"
            animation
        >
            <Modal.Header closeButton>
                <Modal.Title className="text-danger">
                    🗑️ Adicionar Registro
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              
             
                    <div className={style.modal}>                   
                        <input
                            type="text"
                            name="nome"
                            placeholder="Preencha o nome do usuário"
                            onChange={valueInput}
                            value={dados.nome}
                        />
                        
                        <input
                            type="text"
                            name="email"
                            placeholder="Digite o email"
                            onChange={valueInput}
                            value={dados.email}
                        />
                       
                        <input
                            type="text"
                            name="telefone"
                            placeholder="Digite a telefone"
                            onChange={valueInput}
                            value={dados.telefone}
                        />
                    </div>
                
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between">
                <Button variant="secondary" onClick={handleClose}>
                    ❌ Cancelar
                </Button>

                <Button
                    type="submit"
                    variant="success"
                    onClick={(e) => {
                        cadastrar(e);
                        handleClose(false);
                    }}
                >
                    🗑️ Adicionar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AdicionarModal;
