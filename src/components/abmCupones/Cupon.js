import React from 'react'
import '../../css/BootstrapOverride.css'

function Cupon(props) {

    let fechaVencimiento = props.cupon.expireDate.replace('T00:00:00.000Z','').split('-')
    
    function handleDelete() {
        props.select(props.cupon);
        props.onDelete();
    }
    return (
        <> <div className="col-lg-4 col-xl-3 col-md-6 my-1">
            <div className="card my-2">
                <div className="card-body ">
                    <h4 className="card-title text-center mb-3">{props.cupon.name}</h4>
                    <h5 className="">Descuento: <b>{props.cupon.itsPorcentual ? (props.cupon.price + "%") : ("$" + props.cupon.price)}</b></h5>
                    <h6 className="">Vencimiento: <b>{fechaVencimiento[2] + "/" + fechaVencimiento[1] + "/" + fechaVencimiento[0]}</b></h6>

                    <div className="row mx-0 mt-3">
                        <div className="col-6 pe-2 ps-0">
                            <button className="btn btn-primary btn-sm w-100">
                                <i className="fas fa-edit"></i> Editar
                            </button>
                        </div>
                        <div className="col-6 pe-0 ps-2">
                            <button className="btn btn-outline-danger btn-sm w-100" onClick={handleDelete}>
                                <i className="fas fa-trash"></i> Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Cupon;