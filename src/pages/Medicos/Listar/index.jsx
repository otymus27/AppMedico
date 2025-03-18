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

function ListarMedicos() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalAberto, setModalAberto] = useState(false);
    const [registroSelecionado, setRegistroSelecionado] = useState(null);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
    const [nomeSelecionado, setNomeSelecionado] = useState(null);
    const [open, setOpen] = useState(false);
    const [medicos, setMedicos] = useState([]);

   
    const carregarMedicos = async () => {
        try {
            const response = await api.get("http://localhost:3001/medicos");
            setMedicos(response.data);
        } catch (error) {
            console.error("Erro ao buscar os dados:", error);
        }
    };

    useEffect(() => {
        carregarMedicos();
    }, []);

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
                <div className="container">
                    <h1>Listar Médicos</h1>
                    
                    <button
                        onClick={() => setOpen(!open)}
                        className="btn btn-primary"
                    >
                        Cadastrar
                    </button>

                     {/* Modal de Adição */}
                    <ModalCadastro isOpen={open} setOpen={setOpen} atualizarLista={carregarMedicos}/>

                    <Table striped bordered hover>
                        <thead>
                            <tr>
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
                            {medicos.map((medico) => (
                                <tr key={medico._id}>
                                    <td>{medico._id}</td>
                                    <td className="text-center">{medico.nome}</td>
                                    <td className="text-center">{medico.login}</td>
                                    <td className="text-center">{medico.senha}</td>
                                    <td className="text-center">{medico.especialidade}</td>
                                    <td className="text-center">{medico.crm}</td>
                                    <td className="text-center">
                                        {/* Excluir via Modal */}
                                        <button
                                            // onClick={() => abrirModalExclusao(medico._id,medico.nome)}
                                            onClick={() => abrirModalExclusao(medico._id, medico.nome)}
                                            className="btn btn-danger"
                                        >
                                            Excluir
                                        </button>                                       

                                        {/* Editar via Modal */}
                                        <button
                                            onClick={() => abrirModalEdicao(medico._id, medico.nome)}
                                            className="btn btn-secondary"
                                        >
                                            Editar 
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
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
