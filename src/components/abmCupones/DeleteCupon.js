import React from 'react'
import { Modal, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { apiDeleteCupon } from '../apis/apis';

function DeleteCupon(props) {
    
    //token obtenido del store
    const token = useSelector(state => state.tokenReducer);

    const fechaVencimiento = new Date(props.cupon.expireDate);

    async function handleEliminar() {
        const url = apiDeleteCupon(props.cupon._id)

        await fetch(
            url,
            {
                method: 'PUT',
                headers: {
                    'Authorization': token
                }
            }
        ).then(()=>{
            props.getCupones();
            props.handleClose();
        })
    }

    function handleClose() {
        props.handleClose();
    }

    return (
        <>
            <Modal show={props.show} onHide={handleClose} centered>
                <Modal.Header >
                    <Modal.Title>¿Desea eliminar este cupón?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mx-auto">
                        <h4><b>{props.cupon.name}</b></h4>
                        <h6>Descuento: <b>{props.cupon.itsPorcentual ? props.cupon.price + "%" : "$" + props.cupon.price}</b></h6>
                        <h6 className="">Vencimiento: <b>{fechaVencimiento.getDay() + "/" + fechaVencimiento.getMonth() + "/" + fechaVencimiento.getFullYear()}</b></h6>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
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

export default DeleteCupon;