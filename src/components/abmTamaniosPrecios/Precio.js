import React from 'react'

function Precio(props) {

    function handleEditar() {
        props.selectPrecio(props.precio);
        props.toggleEdit();
    }

    function handleEliminar() {
        props.selectPrecio(props.precio);
        props.toggleDelete();
    }

    return (

        <div className="col-lg-4 col-xl-3 col-md-6 my-2">
            <div className="card bottom-squared" >
                <div className="card-body ">
                    <h3 className="card-title text-center">{props.precio.name}</h3>
                    <p className="card-text text-secondary">Precio: ${props.precio.price}</p>
                </div>
            </div>

            <div className="btn-group w-100">
                <button className="col-6 btn btn-primary btn-sm btn-inferior" onClick={handleEditar}>
                    Editar
                </button>
                <button className="col-6 btn btn-danger btn-sm btn-inferior" onClick={handleEliminar}>
                    Eliminar
                </button>
            </div>
        </div>
    );
}

export default Precio;