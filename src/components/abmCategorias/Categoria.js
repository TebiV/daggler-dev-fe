import React from 'react'
function Categoria(props) {

    function handleEdit() {
        props.selectCategoria(props.categoria);
        props.toggleEdit();
    }

    function handleDelete() {
        props.selectCategoria(props.categoria);
        props.toggleDelete();
    }

    return (
        <div className="col-lg-4 col-xl-3 col-md-6 my-2">
            <div className="card" style={{ width: "18rem" }}>

                <div className="card-body">
                    <h3 className="card-title text-center">{props.categoria.name}</h3>

                    <div className="row mx-0">
                        <div className="col-6 px-2">
                            <button className="btn btn-primary btn-sm w-100" onClick={handleEdit}>
                                <i className="fas fa-edit"></i> Editar
                            </button>
                        </div>
                        <div className="col-6 px-2">
                            <button className="btn btn-outline-danger btn-sm w-100" onClick={handleDelete}>
                                <i className="fas fa-trash"></i> Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Categoria;