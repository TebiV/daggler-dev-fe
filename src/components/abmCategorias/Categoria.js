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
        <div className="col-md-4 col-xl-3 col-6 my-2">
            <div className="card">
                <div className="card-body">
                    <h3 className="card-title text-center">{props.categoria.name}</h3>                    
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

export default Categoria;