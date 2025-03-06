import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Page404 from "./pages/Page404";
import Login from "./pages/Login";
import Medicos from "./pages/Medicos/Listar/index.jsx";
import Cadastro from "./pages/Medicos/Cadastrar";
import Editar from "./pages/Medicos/Editar/[id]/index.jsx";
import Edit from "./pages/Medicos/Editar/[id]/edit.jsx"
import Pacientes from "./pages/Pacientes/Listar"


function AppRoutes(){
     return (
          <>
               <BrowserRouter>

                    <Routes>
                         
                         <Route path="/" element={<Login/>}></Route>
                         <Route path="/home" element={<Home/>}></Route>                        
                         <Route path="/sobre" element={<Sobre/>}></Route>  
                         <Route path="/medicos" element={<Medicos/>}></Route> 
                         <Route path="/cadastro" element={<Cadastro/>}></Route>                             
                         <Route path="/editar/:id" element={<Editar/>}></Route>  
                         <Route path="/edit/:id" element={<Edit/>}></Route>  


                            {/*Rotas para pacientes  */}
                        <Route path="/pacientes" element={<Pacientes/>}></Route> 
                        
                         <Route path="*" element={<Page404/>}></Route>
                         

                    </Routes>
               
               </BrowserRouter>         
          
          </>
     )
}

export default AppRoutes;
