import { Modal, Button } from "react-bootstrap";
import api from "../../../../services/api.js";
import { useState, useEffect} from "react";
import style from "../[id]/Modal.module.css";

const EditarModal = ({ isOpen,show, handleClose, registro, atualizarLista }) => {    
    if (!open) return null; // Verifica se o modal deve ser renderizado

    // Declarar uma nova variável dados com state e atribuir o objeto
   const [dados, setDados] = useState({        
        nome: "",
        email: "",
        telefone: "",   
    });    

    //Armazenar estado de erro
    const [erro, setErro] = useState("");


    // Buscar dados do médico sempre que o modal for aberto com um novo registro
    useEffect(() => {
        if (registro) {
            listar(registro);
        }
    }, [registro]);

    // Aqui trago os dados da lista vindo da API
    const listar = async (id)=>{       
        try {
            const response = await api.get(`/pacientes/${id}`);
            console.log(response)
            const { nome, email, telefone } = response.data;
            setDados({ nome, email, telefone });           
        } catch (error) {
            console.error("Erro ao buscar os dados:", error);
        }   
    }

    // Atualiza os valores conforme o usuário digita
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDados((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Executar a função quando o usuário clicar no botão do formulário
    const updatePaciente = async (e) => {
        // Bloquear o recarregamento da página
        e.preventDefault();       
        setErro(""); // Limpa o erro antes de tentar novamente

        // Verificar campos obrigatórios
        if (!dados.nome || !dados.email || !dados.telefone ) {
            setErro("Todos os campos obrigatórios devem ser preenchidos.");
            return;
        }

        // Criar um objeto de atualização sem a senha inicialmente
        const dadosAtualizados = { ...dados };

        try {
            // Fazer a requisição para o servidor utilizando axios, indicando o método da requisição, o endereço, enviar os dados do formulário e o cabeçalho
            await api.patch(`/pacientes/${registro}`,dadosAtualizados)
            alert("Registro atualizado com sucesso!");  
            atualizarLista(); // Props vinda da pagina Listar para atualizar a lista automaticamente    
            // Limpar a mensagem de erro
            setErro("");    
            setOpen(false); // Fecha o modal após salvar              
        } catch (error) {
            console.error("Erro na atualização:", error); // Verificar no console

            // Verificando se o erro tem uma resposta (caso do Axios)
            if (error.response) {
                const mensagemErro = error.response.data?.message || "Erro ao atualizar o usuário.";
                console.log("Mensagem de erro capturada:", mensagemErro); // Verificar no console
                setErro(mensagemErro);
            } else if (error.message) {
                setErro(error.message);
            } else {
                setErro("Erro desconhecido. Tente novamente.");
            }
        }
        
    };
    
  
    if (!show) return null;
    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
            backdrop="static"
            animation
        >
            {erro && <p style={{ color: "red" }}>{erro}</p>}  
            <Modal.Header closeButton>
                <Modal.Title className="text-danger">
                    🗑️ Editar Registro
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>             
             
                    <div className={style.modal}>                   
                        <input
                            type="text"
                            name="nome"
                            placeholder="Digite o nome"
                            onChange={handleInputChange}
                            value={dados.nome || ""}  // <- Isso garante que nunca será undefined                                
                        />
                        
                        <input
                            type="text"
                            name="email"
                            placeholder="Digite o email"
                            onChange={handleInputChange}
                            value={dados.email || ""}
                        />
                       
                        <input
                            type="text"
                            name="telefone"
                            placeholder="Digite o telefone"
                            onChange={handleInputChange}
                            value={dados.telefone || ""}
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
                        updatePaciente(e);
                        handleClose(false);
                    }}
                >
                    🗑️ Editar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditarModal;
