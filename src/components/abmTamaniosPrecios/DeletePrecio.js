import React from 'react'
import { Modal, Button } from 'react-bootstrap';
import { apiDeletePrice } from '../apis/apis';
import { useSelector } from 'react-redux';
function DeletePrecio(props) {

    const token = useSelector(state => state.tokenReducer);

    function handleEliminar() {
        const url = apiDeletePrice(props.precio._id);

        fetch(url,
            {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({ _id: props.precio._id })
            }
        ).then(() => {
            props.borrar(props.precio);
            props.handleClose();
        })
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
                        <h3 >Precio: <b>${props.precio.price}</b></h3>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={props.handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="outline-danger" onClick={handleEliminar}>
                        <i className="fas fa-trash"></i> Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeletePrecio;