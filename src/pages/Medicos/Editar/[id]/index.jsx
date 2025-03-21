import style from "./Modal.module.css";
import Button from "react-bootstrap/Button";
import { useState, useEffect} from "react";
import api from "../../../../services/api.js";
import { data } from "react-router-dom";


function EditModal({ isOpen, setOpen,registro, atualizarLista}) {   

    if (!isOpen) return null; // Se o modal não estiver aberto, não renderiza nada

   // Declarar uma nova variável dados com state e atribuir o objeto
   const [medico, setMedico] = useState({        
    nome: "",
    login: "",    
    especialidade: "",
    crm: "",
}); 

const [senha, setSenha] = useState(""); // Estado separado para a senha


// Buscar dados do médico sempre que o modal for aberto com um novo registro
useEffect(() => {
    if (registro) {
        getMedicos(registro);
    }
}, [registro]);



const getMedicos = async (id)=>{
    //console.log(id)
    try {
        const response = await api.get(`http://localhost:3001/medicos/${id}`);
        console.log(response)
        const { nome, login, especialidade, crm } = response.data;
        setMedico({ nome, login, especialidade, crm }); // Não incluir a senha aqui          
    } catch (error) {
        console.error("Erro ao buscar os dados:", error);
    }   
}
   
    // Atualiza os valores conforme o usuário digita
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Se o campo for "senha", atualiza o estado separado
        if (name === "senha") {
            setSenha(value);
        } else {
            setMedico({ ...medico, [name]: value });
        }
    };
  

    // Executar a função quando o usuário clicar no botão do formulário
    const updateMedico = async (e) => {
        // Bloquear o recarregamento da página
        e.preventDefault();       

        // Criar um objeto de atualização sem a senha inicialmente
        const dadosAtualizados = { ...medico };

        // Incluir a senha apenas se ela foi alterada
        if (senha) {
            dadosAtualizados.senha = senha;
        }

        // Fazer a requisição para o servidor utilizando axios, indicando o método da requisição, o endereço, enviar os dados do formulário e o cabeçalho
        await api
            .patch(`http://localhost:3001/medicos/${registro}`,dadosAtualizados)
            .then((response) => {
                // Acessa o then quando a API retornar status 200                
                alert("Registro atualizado com sucesso!");                
                setOpen(false); // Fecha o modal após salvar
                atualizarLista(); // Props vinda da pagina Listar para atualizar a lista automaticamente
            })
            .catch((error) => {
                // Acessa o catch quando a API retornar erro
                console.error("Erro ao atualizar:", error);
                alert("Erro ao atualizar o médico. Tente novamente.");                
            });
    };

    if (!isOpen) return null;
        return (
            <>
                <div className={style.background}>
                    <div className={style.modal}>
                        <h2>Editar médicos</h2>

                        <form className={style.form} onSubmit={updateMedico}>
                            <input
                                type="text"
                                name="nome"
                                placeholder="Digite o nome"
                                onChange={handleInputChange}
                                value={medico.nome || ""}  // <- Isso garante que nunca será undefined
                            />
                            <input
                                type="text"
                                name="login"
                                placeholder="Digite o login"
                                onChange={handleInputChange}
                                value={medico.login || ""}
                            />
                            <input
                                type="password"
                                name="senha"
                                value={senha}
                                onChange={handleInputChange}
                                placeholder="Senha (deixe em branco para não alterar)"
                            />
                            <input
                                type="text"
                                name="especialidade"
                                placeholder="Digite a especialidade"
                                onChange={handleInputChange}
                                value={medico.especialidade || ""}
                            />
                            <input
                                type="text"
                                name="crm"
                                placeholder="Digite o crm"
                                onChange={handleInputChange}
                                value={medico.crm || ""}
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
                                        updateMedico(e);
                                        setOpen(false);
                                    }}
                                >
                                    Atualizar
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        );
   
}

export default EditModal;
