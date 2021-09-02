import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import NavbarAdmin from '../layout/NavbarAdmin';
import AbmPrecio from './AbmPrecio';
import Precio from './Precio';
function PantallaTamaniosPrecios() {

    const [precios, setPrecios] = useState([]);
    const [selectedPrecio, setSelectedPrecio] = useState([]);

    const [showAbm, setShowAbm] = useState(false);
    function toggleAbm() {
        setShowAbm(!showAbm)
    }

    function getPrecios() {
        const url = 'https://sod-daggler-be.herokuapp.com/api/price';
        axios.get(url).then(res => setPrecios(res.data.data.filter(precio => precio.name !== "Digital")));
        // setPrecios(res.data.data.filter(precio => precio.name !== "Digital"))
        console.log(precios)
    }

    useEffect(()=> {
        getPrecios();
    },[])

    function borrarPrecioArray(precioDelete) {
        setPrecios(precios.filter(precio => precio._id !== precioDelete._id))
    }
    return (
        <>
            <NavbarAdmin />
            <AbmPrecio mode="nuevo" show={showAbm} handleClose={toggleAbm} getPrecios={getPrecios}/>
            <div className="container mt-5 mb-4">
                <div className="row d-flex ">
                    
                    <div className="col-sm-6 px-0">
                        <h1 className="my-auto">Tamaños y Precios de Fotografías</h1>
                    </div>

                    <div className="col-sm-6 d-flex my-auto px-0">
                        <button className="btn btn-primary ms-auto" onClick={toggleAbm}><i className="fas fa-plus me-1"></i> Nuevo</button>
                    </div>

                </div>
            </div>
            <div className="container overflow-auto" style={{ height: "68vh" }}>
                <div className="row ">
                    {precios.map(precio => <Precio key={precio._id} precio={precio} borrar={borrarPrecioArray} getPrecios={getPrecios}/>)}
                </div>
            </div>
        </>
    );
}

export default PantallaTamaniosPrecios;