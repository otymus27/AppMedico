import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../../services/api.js";
import Table from "react-bootstrap/Table";
import Header from "../../../componentes/Header";
import Footer from "../../../componentes/Footer";
import Container from "../../../componentes/Container";
import ModalCadastro from "../../../pages/Medicos/Cadastrar/index.jsx";
import EditModal from "../Editar/[id]/index.jsx";
import ExcluirModal from "../../Medicos/Excluir/ExcluirModal.jsx";
import "bootstrap/dist/css/bootstrap.min.css"; // Importar estilos do Bootstrap
//import style from '../Listar/Listar.module.css';
import styles from "../../Medicos/Listar/ListarMedico.module.css";
import { FaEdit, FaTrashAlt } from "react-icons/fa";  // Importando os ícones

function ListarMedicos() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalAberto, setModalAberto] = useState(false);
    const [registroSelecionado, setRegistroSelecionado] = useState(null);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
    const [nomeSelecionado, setNomeSelecionado] = useState(null);
    const [open, setOpen] = useState(false);
    const [medicos, setMedicos] = useState([]);

    //variaveis para paginação
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);
    const [itensPorPagina] = useState(5); // Número de itens por página

    //Armazenar estado de erro
    const [erro, setErro] = useState("");

   
    const carregarMedicos = async (pagina=1)=>{
        try {
            const response = await api.get(`/medicos?page=${pagina}&limit=${itensPorPagina}`);
            console.log("Dados retornados:", response.data); // Verifique aqui
             // Verificar se o retorno da API é um array ou um objeto
            if (Array.isArray(response.data)) {
                setMedicos(response.data); // API retorna diretamente uma lista
            } else if (Array.isArray(response.data.medicos)) {
                setMedicos(response.data.medicos); // API retorna um objeto com uma lista de médicos
                setTotalPaginas(Math.ceil(response.data.total / itensPorPagina));
            } else {
                console.error("Formato inesperado:", response.data);
                setMedicos([]);
            }
        } catch (error) {
            console.error("Erro ao carregar médicos:", error);
            setErro("Erro ao carregar os médicos.");
        }
    };

     // Efeito para carregar os médicos quando a página inicial for montada
    useEffect(() => {
        carregarMedicos(paginaAtual);
    }, [paginaAtual]);

    // Função para ir para a página anterior
    const paginaAnterior = () => {
        if (paginaAtual > 1) {
            setPaginaAtual(paginaAtual - 1);
        }
    };

    // Função para ir para a próxima página
    const proximaPagina = () => {
        if (paginaAtual < totalPaginas) {
            setPaginaAtual(paginaAtual + 1);
        }
    };

    // Abre modal de edição
    const abrirModalEdicao = (medicoId) => {        
        setRegistroSelecionado(medicoId);
        setIsModalOpen(true);
    };

    // Abre modal de exclusão
    const abrirModalExclusao = (medico, nome) => {
        setUsuarioSelecionado(medico);
        setNomeSelecionado(nome)
        setModalAberto(true);
    };

    // Fecha modal de exclusão
    const fecharModal = () => {
        setModalAberto(false);
    };

    return (
        <>
            <Header />
            <Container>
                <div className={styles.tableContainer}>
                    <h1>Listar Médicos</h1>
                    
                    <button onClick={() => setOpen(!open)} className="btn btn-primary"> Cadastrar </button>

                     {/* Modal de Adição */}
                    <ModalCadastro isOpen={open} setOpen={setOpen} atualizarLista={carregarMedicos}/>

                    {/* Tabela Responsiva */}                    
                    <Table striped bordered hover>
                        <thead>
                            <tr className={styles.tableHeader}>
                                <th>Id</th>
                                <th>Nome</th>
                                <th>Login</th>
                                <th>Senha</th>
                                <th>Especialidade</th>
                                <th>CRM</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(medicos || []).map((medico) => (
                                <tr key={medico._id} className={styles.tableRow}>
                                    <td>{medico._id}</td>
                                    <td>{medico.nome}</td>
                                    <td>{medico.login}</td>
                                    <td>{medico.senha}</td>
                                    <td>{medico.especialidade}</td>
                                    <td>{medico.crm}</td>
                                    <td className={styles.tableActions}>
                                        {/* Ícone de Excluir por modal*/}
                                        <i
                                            onClick={() => abrirModalExclusao(medico._id, medico.nome)}
                                            className="text-danger"
                                            title="Excluir"
                                        >
                                            <FaTrashAlt />
                                        </i>                                  

                                        {/* Ícone de Editar por modal */}
                                        <i
                                            onClick={() => abrirModalEdicao(medico._id, medico.nome)}
                                            className="text-secondary"
                                            title="Editar"
                                        >
                                            <FaEdit />
                                        </i>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>                   

                    {/* Navegação de Paginação */}
                    <div className={styles.pagination}>
                        <button onClick={paginaAnterior} disabled={paginaAtual === 1}>
                            ⬅️ Anterior
                        </button>
                        <span>
                            Página {paginaAtual} de {totalPaginas}
                        </span>
                        <button onClick={proximaPagina} disabled={paginaAtual === totalPaginas}>
                            Próxima ➡️
                        </button>
                    </div>

                </div>

            </Container>
            <Footer />

            {/* Aqui chama o Modal de Edição */}
            <EditModal isOpen={isModalOpen} setOpen={setIsModalOpen} registro={registroSelecionado} atualizarLista={carregarMedicos} />

            {/* Aqui chama o Modal de exclusão */}
            <ExcluirModal show={modalAberto} handleClose={fecharModal} item={usuarioSelecionado} nome={nomeSelecionado} atualizarLista={carregarMedicos} />
           

        </>
    );
}

export default ListarMedicos;
