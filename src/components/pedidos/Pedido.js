import React from 'react'

const Pedido = (props) => {
    return <>
        <div className="col-lg-4 col-xl-4 col-md-6 my-1" >
            <div className="card mt-2 m-0">
                <div className="card-body ">

                    <h4 className="card-title text-center mb-3">APELLIDO, NOMBRE</h4>
                    <div className="d-flex justify-content-between mb-2">
                        <h4 className="my-auto">Monto: $123</h4>
                        <h6 className="my-auto">23/11/2022</h6>
                    </div>

                    <div className="d-flex">
                        <div className="col-6 pe-1"><div className="alert alert-warning p-1 m-0 text-center">Por entregar</div></div>
                        <div className="col-6 ps-1 "><div className="alert alert-secondary p-1 m-0  text-center">Retiro en el local</div></div>
                    </div>


                </div>

            </div>
            <div className="row mx-0 btn-inferior">
                <button className="btn btn-primary btn-sm col-12 btn-inferior">
                    Ver detalle
                </button>
            </div>
        </div>
    </>
}

export default Pedido;