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
            <div className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                    <h3 className="card-title">{props.precio.name}</h3>
                    <p className="card-text">Precio: ${props.precio.price}</p>
                    <div className="row mx-0">
                        <div className="col-6 px-2">
                            <button className="btn btn-primary btn-sm w-100"
                                onClick={handleEditar}
                            >
                                <i className="fas fa-edit"></i> Editar
                            </button>
                        </div>
                        <div className="col-6 px-2">
                            <button className="btn btn-outline-danger btn-sm w-100"
                                onClick={handleEliminar}
                            >
                                <i className="fas fa-trash"></i> Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Precio;