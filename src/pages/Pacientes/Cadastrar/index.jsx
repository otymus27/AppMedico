import { Modal, Button } from "react-bootstrap";
import api from "../../../services/api.js";
import { useState } from "react";
import style from "./Modal.module.css";

const AdicionarModal = ({ show, handleClose, atualizarLista }) => {
    // Declarar uma nova variável dados com state e atribuir o objeto
    const [dados, setDados] = useState({
        nome: "",
        email: "",
        telefone: "",
    });

    // Declarar a variável para receber a mensagem de erro            
    const [erro, setErro] = useState("");

    // Receber os dados dos campos do formulário
    const valueInput = (e) =>
        setDados({ ...dados, [e.target.name]: e.target.value });

    // Função para cadastrar registro no banco de dados
    const cadastrar = async (e) => {
        e.preventDefault(); // Bloquear o recarregamento da página
        setErro(""); // Limpa o erro antes de tentar novamente
        

        // Verificar se todos os campos obrigatórios estão preenchidos
        if (!dados.nome || !dados.email || !dados.telefone ) {
            setErro("Todos os campos são obrigatórios!");
            return; // Impede o envio da requisição para o backend
        }

        try {
            await api.post("/pacientes/", dados);
            alert("Registro adicionado com sucesso!");
            atualizarLista(); // Atualiza a lista automaticamente
            setOpen(false); // Fecha o modal após salvar

            // Limpar os dados do state e os campos do formulário
            setData({
                nome: "",
                email: "",
                telefone: "",                
            });

            // Limpar a mensagem de erro
            setErro("");
            setOpen(false); // Fecha o modal após o sucesso
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setErro(error.response.data.message);
            } else {
                setErro("Erro ao cadastrar registro. Tente novamente.");
            }
        }
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
