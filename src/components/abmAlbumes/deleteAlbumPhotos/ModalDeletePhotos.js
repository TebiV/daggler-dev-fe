import React from 'react'
import { Modal } from 'react-bootstrap';
const ModalDeletePhotos = (props) => {


    function handleEliminar() {

    }
    return (
        <Modal show={props.show} onHide={props.handleClose} centered size="sm">
            <Modal.Header><Modal.Title>{props.title}</Modal.Title></Modal.Header>
            <Modal.Body>
                <div className="mx-auto">
                    <h4>¿Desea borrar {props.amount} fotos <b>permanentemente</b>?</h4>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="d-flex justify-content-center">
                    <button className="btn btn-primary me-2" onClick={props.handleClose}>
                        Cancelar
                    </button>
                    <button className="btn btn-outline-danger" onClick={handleEliminar}>
                        <i className="fas fa-trash"></i> Eliminar
                    </button>
                </div>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalDeletePhotos;