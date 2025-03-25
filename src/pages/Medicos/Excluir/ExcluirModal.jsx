import { Modal, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import api from "../../../services/api";



const ExcluirModal = ({show, handleClose, item, nome, atualizarLista,}) => {
        
    const excluir = async (e) => {
        // Bloquear o recarregamento da página
        e.preventDefault();
        try {
            await api.delete(`/medicos/${item}`);
            //  console.log(`Usuário ${nome} excluído`);
            atualizarLista(); // Props vinda da pagina Listar para atualizar a lista automaticamente
        } catch (error) {
            console.error("Erro ao excluir:", error);
        }
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
                    🗑️ Confirmar Exclusão
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <p className="fw-bold text-center">
                        Tem certeza de que deseja excluir{" "}
                        <strong>{nome}</strong>?
                    </p>
                    <p className="text-center text-muted">
                        Esta ação não pode ser desfeita!
                    </p>
                </motion.div>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between">
                <Button variant="secondary" onClick={handleClose}>
                    ❌ Cancelar
                </Button>

                <Button type="submit" variant="danger" onClick={(e) => {
                        excluir(e);
                        handleClose(false);
                    }}
                >
                    🗑️ Excluir
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ExcluirModal;
