import React from 'react'
import '../../css/BootstrapOverride.css'

function Cupon(props) {

    let fechaVencimiento = props.cupon.expireDate.slice(0, 10).split('-')

    function handleDelete() {
        props.select(props.cupon);
        props.onDelete();
    }

    function handleEdit() {
        props.select(props.cupon);
        props.onEdit();
    }


    return (
        <div className="col-lg-4 col-xl-3 col-md-6 my-2 " >
            <div className="card ">
                <div className="card-body ">
                    <h4 className="card-title text-center mb-3">{props.cupon.name}</h4>
                    <h5 className="">Descuento: <b>{props.cupon.itsPorcentual ? (props.cupon.price + "%") : ("$" + props.cupon.price)}</b></h5>
                    <h6 className="">Vencimiento: <b>{fechaVencimiento[2] + "/" + fechaVencimiento[1] + "/" + fechaVencimiento[0]}</b></h6>
                    <h6 className="">Usos restantes: <b>{props.cupon.uses}</b></h6>
                </div>
            </div>
            <div className="btn-group w-100">
                <button className="col-6 btn btn-primary btn-sm btn-inferior" onClick={handleEdit}>
                    Editar
                </button>
                <button className="col-6 btn btn-outline-danger btn-sm btn-inferior" onClick={handleDelete}>
                    Eliminar
                </button>
            </div>
        </div>
    );
}

export default Cupon;