import { Modal, Button } from "react-bootstrap";
import api from "../../services/api.js";
import { useState, useEffect} from "react";
import style from "../Modals/Modal.module.css";

const EditarModal = ({ show, handleClose, registro, item, atualizarLista }) => {
    if (!show) return null; // Se o modal não estiver aberto, não renderiza nada
    // Declarar uma nova variável dados com state e atribuir o objeto
   const [paciente, setPaciente] = useState({        
        nome: "",
        email: "",
        telefone: "",   
    });    

    // Buscar dados do médico sempre que o modal for aberto com um novo registro
    useEffect(() => {
        if (registro) {
            getPacientes(registro);
        }
    }, [registro]);

    const getPacientes = async (id)=>{       
        try {
            const response = await api.get(`http://localhost:3001/paciente/${id}`);
            console.log(response)
            setPaciente(response.data);               
        } catch (error) {
            console.error("Erro ao buscar os dados:", error);
        }   
    }

    // Atualiza os valores conforme o usuário digita
    const handleInputChange = (e) => {
        setPaciente({ ...paciente, [e.target.name]: e.target.value });
    };

    // Executar a função quando o usuário clicar no botão do formulário
    const updatePaciente = async (e) => {
        // Bloquear o recarregamento da página
        e.preventDefault();       

        // Fazer a requisição para o servidor utilizando axios, indicando o método da requisição, o endereço, enviar os dados do formulário e o cabeçalho
        await api
            .put(`http://localhost:3001/paciente/${registro}`,paciente)
            .then((response) => {
                // Acessa o then quando a API retornar status 200                
                alert("Registro atualizado com sucesso!"); 
                atualizarLista(); // Props vinda da pagina Listar para atualizar a lista automaticamente
            })
            .catch((error) => {
                // Acessa o catch quando a API retornar erro
                console.error("Erro ao atualizar:", error);
                alert("Erro ao atualizar o registro. Tente novamente.");                
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
                            value={paciente.nome || ""}  // <- Isso garante que nunca será undefined
                        />
                        
                        <input
                            type="text"
                            name="login"
                            placeholder="Digite o email"
                            onChange={handleInputChange}
                            value={paciente.email || ""}
                        />
                       
                        <input
                            type="text"
                            name="senha"
                            placeholder="Digite o telefone"
                            onChange={handleInputChange}
                            value={paciente.telefone || ""}
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
