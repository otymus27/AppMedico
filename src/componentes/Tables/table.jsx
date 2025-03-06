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
import { useState, useEffect } from "react";
import api from "../../services/api";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


function DataTable() {

    const [itensPorPage, setItensPorPage] = useState(10); //números de itens por pagina
    const [currentPage, setCurrentPage]= useState(0); // Página corrente por padrão
    const [pacientes, setPacientes] = useState([]);

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

   
    return (
        <>
            <Box
                sx={{
                    height: "100%",
                    width: "90%",
                    backgroundColor: "#ccc",
                    my: 4,
                    display: "flex",
                    flexDirection:"column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 4,
                    p: 2,
                    borderRadius: 4,
                    border: "2px solid grey",
                }}
            >

                {/* Editar via Modal */}
                <Button variant="outlined" color="info" startIcon={<EditIcon />}             
                >
                    Cadastrar 
                </Button>

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
                                        onClick={() => abrirModalEdicao(paciente._id, paciente.nome)}                                       
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
        </>
    );
}

export default DataTable;
