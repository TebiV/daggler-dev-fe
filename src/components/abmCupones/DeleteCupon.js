import React from 'react'
import { Modal, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function DeleteCupon(props) {
    //token obtenido del store
    const token = useSelector(state => state.tokenReducer);

    const fechaVencimiento = new Date(props.cupon.expireDate);

    async function handleEliminar() {
        const url = 'https://sod-daggler-be.herokuapp.com/api/coupon/delete'

        await fetch(
            url,
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({ idCoupon: props.cupon._id })
            }
        ).then(response => {
            console.log(response)
        })
        .then(()=>{
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