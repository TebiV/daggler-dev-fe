import { Modal } from 'react-bootstrap';
import React, { useState } from 'react'
import { apiCreateCategory } from '../apis/apis';
import { useSelector } from 'react-redux';

function NewCategoria(props) {

    const token = useSelector(state => state.tokenReducer);

    const [nombre, setNombre] = useState("");

    //sirve para mostrar un error en caso de que traten de crear una categ con campos incompletos
    const [error, setError] = useState(false);

    //resetea todo cuando cierra
    function handleClose() {
        props.handleClose();
        setNombre("");
        setError(false);
    }


    function crearCategoria() {
        if (nombre !== "") {
            const url = apiCreateCategory;
            fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({ name: nombre })
            }).then(() => {
                props.getCategorias();
                handleClose();
            })

        } else {
            setError(true);
        }
    }

    function handleNombre(e) {
        setNombre(e.target.value);
    }

    return (
        <Modal show={props.show} onHide={handleClose} centered>
            <Modal.Header >
                <Modal.Title>Nueva Categoría</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form autoComplete="off">
                    <div className="d-flex">
                        <h5 className="my-auto me-2">Nombre:</h5>
                        <input
                            type="text"
                            name="nombre"
                            className="form-control "
                            placeholder="Ej: Bautismos"
                            value={nombre}
                            onChange={handleNombre}
                        />
                    </div>
                </form>

                {error
                    ?
                    <div className="alert alert-warning mb-0 mt-3">
                        <i class="bi bi-exclamation-triangle">
                        </i> Los campos no pueden quedar incompletos.
                    </div>
                    :
                    null
                }
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-outline-danger" onClick={handleClose}>
                    Cancelar
                </button>
                <button className="btn btn-primary" onClick={crearCategoria}>
                    Crear categoría
                </button>
            </Modal.Footer>
        </Modal>
    );
}

export default NewCategoria;