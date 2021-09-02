import React from 'react'
import { Modal, Button } from 'react-bootstrap';
import { DAGGLER_ADMIN } from '../token tags/DAGGLER_ADMIN';
function ModalConfirmDeletePrice(props) {

    function handleEliminar() {
        const url = `https://sod-daggler-be.herokuapp.com/api/price/${props.precio._id}`

        fetch(url,
            {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': window.localStorage.getItem(DAGGLER_ADMIN)
                },
                body: JSON.stringify({ _id: props.precio._id })
            }
        )
        props.borrar(props.precio);
    }


    return (
        <>
            <Modal show={props.show} onHide={props.handleClose} centered>
                <Modal.Header >
                    <Modal.Title>¿Desea eliminar este precio?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mx-auto">
                        <h4>Nombre: <b>{props.precio.name}</b></h4>
                        <h4 >Precio: <b>${props.precio.price}</b></h4>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={props.handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="outline-danger" onClick={handleEliminar}>
                        <i class="fas fa-trash"></i> Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalConfirmDeletePrice;