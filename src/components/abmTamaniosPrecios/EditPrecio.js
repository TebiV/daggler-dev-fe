import { Modal, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import { apiEditPrice } from '../apis/apis';
import { useSelector } from 'react-redux';

function EditPrecio(props) {

    const token = useSelector(state => state.tokenReducer);

    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");

    const [error, setError] = useState(false);

    function handleClose() {
        props.handleClose();
        setError(false);
    }

    function editarPrecio() {
        if (nombre === "" || isNaN(precio)) {
            setError(true);
        } else {
            const url = apiEditPrice(props.precio._id);

            fetch(url, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({ name: nombre, price: precio })
            }).then(() => {
                props.getPrecios();
                handleClose();
            })
        }
    }

    function handlePrecio(e) {
        if (!isNaN(e.target.value)) {
            setPrecio(e.target.value);
        }
    }

    function handleNombre(e){
        setNombre(e.target.value)
    }

    function handleShow() {
        setNombre(props.precio.name);
        setPrecio(props.precio.price);
    }

    return (
        <Modal show={props.show} onHide={handleClose} onShow={handleShow} centered>
            <Modal.Header >
                <Modal.Title>Editar Precio</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <h5>Nombre:</h5>
                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Ej: 25x40"
                        value={nombre}
                        onChange={handleNombre}
                    />

                    <h5>Precio ($):</h5>
                    <input
                        type="number"
                        name="precio"
                        className="form-control"
                        placeholder="Ej: 150"
                        value={precio}
                        onChange={handlePrecio}
                    />
                </form>
                {error
                    ?
                    <div className="alert alert-warning mb-0 mt-3">
                        <b><i class="bi bi-exclamation-triangle">
                        </i> Los campos no pueden quedar incompletos.</b>
                    </div>
                    :
                    null
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={editarPrecio}>
                    Editar precio
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditPrecio;