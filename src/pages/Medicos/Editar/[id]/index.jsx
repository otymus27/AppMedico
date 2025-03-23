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

// Declarar a variável para receber a mensagem de erro            
const [erro, setErro] = useState("");


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
        setErro(""); // Limpa o erro antes de tentar novamente

        // Verificar campos obrigatórios
        if (!medico.nome || !medico.login || !medico.especialidade || !medico.crm) {
            setErro("Todos os campos obrigatórios devem ser preenchidos.");
            return;
        }

        // Criar um objeto de atualização sem a senha inicialmente
        const dadosAtualizados = { ...medico };

        // Incluir a senha apenas se ela foi alterada
        if (senha) {
            dadosAtualizados.senha = senha;
        }

        try {
            // Fazer a requisição para o servidor utilizando axios, indicando o método da requisição, o endereço, enviar os dados do formulário e o cabeçalho
            await api.patch(`/medicos/${registro}`,dadosAtualizados)
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

    if (!isOpen) return null;
        return (
            <>
                <div className={style.background}>
                    <div className={style.modal}>
                        <h2>Editar médicos</h2>

                        {erro && <p style={{ color: "red" }}>{erro}</p>}  

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
                                <Button variant="secondary" onClick={() => setOpen(!isOpen)}>Fechar</Button>

                                <Button type="submit" variant="primary" > Atualizar </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        );
   
}

export default EditModal;
