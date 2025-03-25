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
    const [open, setOpen] = useState(false);

    //variaveis para paginação
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);
    const [itensPorPagina] = useState(5); // Número de itens por página

    //Armazenar estado de erro
    const [erro, setErro] = useState("");



    const carregarPacientes = async (pagina=1)=>{
        try {
            const response = await api.get(`/pacientes?page=${pagina}&limit=${itensPorPagina}`);
            console.log("Dados retornados:", response.data); // Verifique aqui
             // Verificar se o retorno da API é um array ou um objeto
            if (Array.isArray(response.data)) {
                setPacientes(response.data); // API retorna diretamente uma lista
            } else if (Array.isArray(response.data.pacientes)) {
                setPacientes(response.data.pacientes); // API retorna um objeto com uma lista de médicos
                setTotalPaginas(Math.ceil(response.data.total / itensPorPagina));
            } else {
                console.error("Formato inesperado:", response.data);
                setPacientes([]);
            }
        } catch (error) {
            console.error("Erro ao carregar médicos:", error);
            setErro("Erro ao carregar os médicos.");
        }
    };

    // Efeito para carregar os médicos quando a página inicial for montada
    useEffect(() => {
        carregarPacientes(paginaAtual);
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
                        {/* Navegação de Paginação */}
                        <div>
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
