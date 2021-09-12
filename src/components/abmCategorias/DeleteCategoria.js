import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap';
import { DAGGLER_ADMIN } from '../token tags/DAGGLER_ADMIN';
function DeleteCategoria(props) {

    //si la categoria tiene albumes, pasa a true y se muestra un error
    const [error, setError] = useState(false);
    
    async function handleEliminar() {
        const url = `https://sod-daggler-be.herokuapp.com/api/category/${props.categoria._id}`

        await fetch(
            url,
            {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': window.localStorage.getItem(DAGGLER_ADMIN)
                },
                body: JSON.stringify({ _id: props.categoria._id })
            }
        ).then(response => {
            if (response.status === 400) {
                console.log("eshor")
                setError(true);
                return response.json();
            } else if (response.status === 200) {
                props.borrarCategoria(props.categoria);
                handleClose();
            }
        })
    }

    function handleClose() {
        props.handleClose();
        setError(false);
    }

    return (
        <>
            <Modal show={props.show} onHide={handleClose} centered>
                <Modal.Header >
                    <Modal.Title>¿Desea eliminar esta  categoría?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mx-auto">
                        <h4>Nombre: <b>{props.categoria.name}</b></h4>
                    </div>
                    {error
                        ?
                        <div className="alert alert-warning mb-0 mt-3">
                            <b><i class="bi bi-exclamation-triangle">
                            </i> Esta categoría contiene álbumes. Por favor, borre los álbumes primero.</b>
                        </div>
                        :
                        null
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
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

export default DeleteCategoria;