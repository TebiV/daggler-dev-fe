import React from 'react';
import '../../css/FormDatosCliente_css.css'
import {Link} from 'react-router-dom'

const FormDatosCliente = () => {

    const handleChange=e=>{}

    return ( 
        <>
            <div className="container top-row">
                <div className="row">
                    <h3 className="font-weight-bold">DATOS DEL CLIENTE</h3>
                </div>
                <div className="row">

                    <div className="col-xs-12 col-md-8">
                        <div className="row mb-3">

                            <div className="col-xs-12 col-md-6">

                                <label htmlFor="nombre" className="font-weight-bold" >Nombre</label>
                                <input
                                    type="text"
                                    autoComplete="off"
                                    placeholder="Ej. Juan"
                                    className="form-control "
                                    name="nombre"
                                    id="nombre"
                                    onChange={handleChange}

                                />
                            </div>
                            <div className="col-xs-12 col-md-6">

                                <label htmlFor=""className="font-weight-bold" >Apellido</label>
                                <input
                                    type="text"
                                    autoComplete="off"
                                    placeholder="Ej. Perez"
                                    className="form-control "
                                    name="apellido"
                                    onChange={handleChange}

                                />
                            </div>
                        </div>
                        <div className="row mb-3">

                            <div className="col-xs-12 col-md-6">
                                <label htmlFor="direccion" className="font-weight-bold">Dirección</label>
                                <input
                                    type="text"
                                    autoComplete="off"
                                    placeholder="Ej. Av. Siempre Viva 742"
                                    className="form-control "
                                    name="direccion"
                                    id="direccion"
                                    onChange={handleChange}

                                />
                            </div>
                            <div className="col-xs-12 col-md-6">
                                
                                <label htmlFor="" className="font-weight-bold">Ciudad</label>
                                <input
                                    type="text"
                                    autoComplete="off"
                                    placeholder="Ej. Villa Maria"
                                    className="form-control "
                                    name="ciudad"
                                    onChange={handleChange}

                                />
                            </div>
                        </div>
                        <div className="row mb-3">

                            <div className="col-xs-12 col-md-6">

                                <label htmlFor=""className="font-weight-bold" >E-mail</label>
                                <input
                                    type="mail"
                                    autoComplete="off"
                                    placeholder="ej. ejemplo@ejemplo.com"
                                    className="form-control "
                                    name="email"
                                    onChange={handleChange}

                                />
                            </div>
                            <div className="col-xs-12 col-md-6">

                                <label htmlFor=""className="font-weight-bold" >Numero de teléfono</label>
                                <input
                                    type="number"
                                    autoComplete="off"
                                    placeholder="ej. 353422222"
                                    className="form-control "
                                    name="telefono"
                                    onChange={handleChange}

                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-4" >
                        <div className="row c">
                            <div className="col-xs-6 b">
                            <input type="radio" className="opcionCheck" name="options" id="option2" autocomplete="off" checked/>
                                <label class="labelOpcionCheck" htmlFor="option2"><i className="fas fa-home">
                                    <span>Retiro en el Estudio</span></i>
                                    
                                </label>

                            </div>
                            <div className="col-xs-6 b">
                                
                            <input type="radio" className="opcionCheck" name="options" id="option1" autocomplete="off" />
                                <label class="labelOpcionCheck" htmlFor="option1"><i className="fas fa-motorcycle"><span>Envio con cadete</span></i></label>


                            </div>
                            
                            
                        </div>

                    </div>
                        
                        <div className="row NewAlbumes_botones">
                                <Link to={'/admin'}>
                                    <button type="button" className="btn btn-light">Volver</button>
                                </Link>
                                <Link to={'/admin'}>
                                    <button type="button" className="btn btn-warning">Siguiente</button>
                                </Link>
                        </div>
                </div>
            </div>
        </>
     );
}
 
export default FormDatosCliente;