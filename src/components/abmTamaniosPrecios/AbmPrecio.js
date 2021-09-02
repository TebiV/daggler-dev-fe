import { Modal, Button } from 'react-bootstrap';
import React, { useState } from 'react'
import { DAGGLER_ADMIN } from '../token tags/DAGGLER_ADMIN';

function AbmPrecio(props) {


    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");


    function handleCancelar() {
        setNombre("");
        setPrecio("");
        console.log("puto");

        props.handleClose();
        console.log(nombre);
        console.log(precio);
    }

    function crearPrecio() {

        const url = 'https://sod-daggler-be.herokuapp.com/api/price';

        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': window.localStorage.getItem(DAGGLER_ADMIN)
            },
            body: JSON.stringify({ name: nombre, price: precio })

        }).then(res => { return res.json() })
            .then(resp => {
                console.log(resp)
                props.getPrecios();
                setNombre("");
                setPrecio("");
            })
        // props.getPrecios();

        props.handleClose();
    }

    function handlePrecio(e) {
        setPrecio(parseInt(e.target.value));
        // console.log(typeof precio)
    }

    return (
        <Modal show={props.show} onHide={props.handleClose} centered>
            <Modal.Header >
                <Modal.Title>Nuevo Precio</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <h5>Nombre:</h5>
                    <input
                        type="text"
                        name="nombre"
                        className="form-control mb-3"
                        placeholder="Ej: 25x40"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />

                    <h5>Precio ($):</h5>
                    <input
                        type="number"
                        name="precio"
                        defaultValue={null}
                        className="form-control"
                        placeholder="Ej: 150"
                        value={precio}
                        onChange={handlePrecio}
                    />
                </form>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-outline-danger" onClick={handleCancelar}>
                    Cancelar
                </button>
                <button className="btn btn-primary" onClick={crearPrecio}>
                    Crear precio
                </button>
            </Modal.Footer>
        </Modal>
    );
}

export default AbmPrecio;