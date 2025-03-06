import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../../services/api";

const EditPage = () => {

    let { id } = useParams();
    console.log(id)

    const [isLoading, setIsLoading] = useState(false);

    // Declarar uma nova variável dados com state e atribuir o objeto
    const [medico, setMedico] = useState({        
        nome: "",
        login: "",
        senha: "",
        especialidade: "",
        crm: "",
    }); 

    const getMedicos = async ()=>{
        setIsLoading(true);
        try {
            const response = await api.get(`http://localhost:3001/medico/${id}`);
            console.log(response)
            setMedico({
                nome: response.data.nome,
                login:response.data.login,
                senha:response.data.senha,
                especialidade:response.data.especialidade,
                crm:response.data.crm,                        
            })            
        } catch (error) {
            setIsLoading(false);
        }   
    }

    useEffect(()=>{
        getMedicos()
    },[])

    return (
        <div>
            <nav className="bg-gray-800">
                <div className="container mx-auto p-2">
                    <a href="/app-cadastro/src/pages/Home/index.jsx"><h2 className="text-white text-2x1 font-bold">React CRUD</h2></a>
                </div>
            </nav>

            id: {id} <br />
            nome: {medico.nome} <br />
            login: {medico.login} <br />
            senha: {medico.senha} <br />
            especialidade: {medico.especialidade} <br />
            CRM: {medico.crm}

            <h1>Editar Teste</h1>
        </div>
    )
}

export default EditPage;
