import { useState, useEffect } from "react";
import api from "../../../services/api.js";
import Header from "../../../componentes/Header";
import Footer from "../../../componentes/Footer";
import Container from "../../../componentes/Container";
import AdicionarModal from "../../../pages/Pacientes/Cadastrar/index.jsx"
import EditarModal from "../../../pages/Pacientes/Editar/[id]/index.jsx";
import ExcluirModal from "../../Pacientes/Excluir/ExcluirModal.jsx";
import "bootstrap/dist/css/bootstrap.min.css"; // Importar estilos do Bootstrap

import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableContainer,
    Button,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';




function ListarPacientes() {    
    const [modalAberto, setModalAberto] = useState(false);
    const [modalAdicionarAberto, setModalAdicionarAberto] = useState(false);
    const [modalEditarAberto, setModalEditarAberto] = useState(false);
    const [registroSelecionado, setRegistroSelecionado] = useState(null);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
    const [nomeSelecionado, setNomeSelecionado] = useState(null);    
    const [pacientes, setPacientes] = useState([]);

    // Declarar a variável para receber o número da página
    const [page, setPage] = useState();
    // Declarar a variável para receber o número da ultima página
    const [ultimaPagina, setUltimaPagina] = useState();


    const carregarPacientes = async () => {
        try {
            const response = await api.get("http://localhost:3001/pacientes");
            setPacientes(response.data);
        } catch (error) {
            console.error("Erro ao buscar os dados:", error);
        }
    };

    useEffect(() => {
        carregarPacientes();
    }, []);
    

    // Abre modal de exclusão
    const abrirModalExclusao = (paciente, nome) => {
        setUsuarioSelecionado(paciente);
        setNomeSelecionado(nome)
        setModalAberto(true);
    };

    // Fecha modal de exclusão
    const fecharModal = () => {
        setModalAberto(false);
    };

    // Abre modal de adição
     const abrirModalAdição = () => {        
        setModalAdicionarAberto(true);
    };

     // Fecha modal de adição
     const fecharAdicionarModal = () => {
        setModalAdicionarAberto(false);
    };


    // Abre modal de edição
    const abrirModalEditar = (pacienteId)=>{
        setRegistroSelecionado(pacienteId);
        setModalEditarAberto(true);
    }

    // Fecha modal de edição
    const fecharModalEditar = ()=>{
        setModalEditarAberto(false);
    }
 

    return (
        <>
            <Header />
            <Container>
                <div className="container">
                    <h1>Listar Pacientes</h1>                  

                    {/* Botão para chamar Adicionar via Modal */}  
                    <Button variant="outlined" color="info" onClick={()=>abrirModalAdição()} >
                        Cadastrar 
                    </Button>                 

                    {/* Modal de Adição */}
                    <AdicionarModal show={modalAdicionarAberto} handleClose={fecharAdicionarModal} atualizarLista={carregarPacientes} />
                   

                    <Box
                        sx={{
                            height: "100%",
                            width: "100%",
                            backgroundColor: "#ccc",
                            my: 4,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 4,
                            p: 2,
                            borderRadius: 4,
                            border: "2px solid grey",
                        }}
                    >                       
        
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Id</TableCell>
                                        <TableCell>Nome</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Telefone</TableCell>
                                        <TableCell align="center" colSpan={2}>Ações</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {pacientes.map((paciente) => (
                                        <TableRow key={paciente._id}>
                                            <TableCell>{paciente._id}</TableCell>
                                            <TableCell>{paciente.nome}</TableCell>
                                            <TableCell>{paciente.email}</TableCell>
                                            <TableCell>{paciente.telefone}</TableCell>
                                            <TableCell>                                               
                                                {/* Editar via Modal */}
                                                <Button variant="outlined" color="info" startIcon={<EditIcon />}
                                                    onClick={() => abrirModalEditar(paciente._id)}
                                                >
                                                    Editar
                                                </Button>

                                            </TableCell>

                                            <TableCell>
                                                {/* Excluir via Modal */}
                                                <Button variant="outlined" color="error" startIcon={<DeleteIcon />}
                                                    onClick={() => abrirModalExclusao(paciente._id, paciente.nome)}
                                                >
                                                    Excluir
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </div>

            </Container>
            <Footer />

            {/* Aqui chama o Modal de Edição */}          
            <EditarModal show={modalEditarAberto} handleClose={fecharModalEditar} registro={registroSelecionado} atualizarLista={carregarPacientes} />
                 

            {/* Aqui chama o Modal de exclusão */}
            <ExcluirModal show={modalAberto} handleClose={fecharModal} item={usuarioSelecionado} nome={nomeSelecionado} atualizarLista={carregarPacientes} />
            

        </>
    );
}

export default ListarPacientes;
