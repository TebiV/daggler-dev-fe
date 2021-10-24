import React from 'react'

const Pedido = (props) => {
    return <>
        <div className="col-lg-4 col-xl-4 col-md-6 my-1" >
            <div className="card my-2">
                <div className="card-body ">

                    <h4 className="card-title text-center mb-3">NOMBRE APELLIDO</h4>
                    <div className="d-flex justify-content-between mb-2">
                        <h4 className="my-auto">Monto: $123</h4>
                        <h6 className="my-auto">23/11/2022</h6>
                    </div>

                    <div className="d-flex">
                        <div className="col-6 pe-1"><div className="alert alert-warning p-1 m-0 text-center">Por entregar</div></div>
                        <div className="col-6 ps-1 "><div className="alert alert-secondary p-1 m-0  text-center">Retiro en el local</div></div>
                    </div>

                    <div className="row mx-0 mt-3">
                        <div className="col-12 pe-2 ps-0">
                            <button className="btn btn-primary btn-sm w-100">
                                Ver detalle
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Pedido;