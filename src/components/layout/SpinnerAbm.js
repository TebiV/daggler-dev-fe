import React from 'react'

function SpinnerAbm() {
    return (
        <div className="m-auto d-flex height-spinner" style={{ height: "68vh" }}>
            <div className="spinner-cargando-albumes spinner-border text-primary m-auto py-auto" role="status">
                <span className="visually-hidden">Cargando...</span>
            </div>
        </div>
    );
}

export default SpinnerAbm;