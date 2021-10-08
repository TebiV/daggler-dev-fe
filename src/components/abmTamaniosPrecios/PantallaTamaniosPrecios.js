import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import NavbarAdmin from '../layout/NavbarAdmin';
import NewPrecio from './NewPrecio';
import Precio from './Precio';
import EditPrecio from './EditPrecio';
import DeletePrecio from './DeletePrecio';
import { apiGetPrices } from '../apis/apis';


function PantallaTamaniosPrecios() {

    const [precios, setPrecios] = useState([]);

    const [showNew, setShowNew] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);


    function toggleNew() { setShowNew(!showNew) }
    function toggleEdit() { setShowEdit(!showEdit) }
    function toggleDelete() { setShowDelete(!showDelete) }

    const [selectedPrecio, selectPrecio] = useState({});

    async function getPrecios() {
        const url = apiGetPrices;
        await axios.get(url).then(res => setPrecios(res.data.data));
    }

    useEffect(() => {
        getPrecios();
    }, [])

    function borrarPrecioArray(precioDelete) {
        setPrecios(precios.filter(precio => precio._id !== precioDelete._id))
    }
    return (
        <>
            <NavbarAdmin />
            <NewPrecio mode="nuevo" show={showNew} handleClose={toggleNew} getPrecios={getPrecios} />
            <EditPrecio show={showEdit} handleClose={toggleEdit} getPrecios={getPrecios} precio={selectedPrecio}/>
            <DeletePrecio show={showDelete} handleClose={toggleDelete} borrar={borrarPrecioArray} precio={selectedPrecio}/>
            
            <div className="container mt-5 mb-4">
                <div className="row d-flex mx-2 mx-sm-0">

                    <div className="col-sm-9 px-0 text-center text-sm-start">
                        <h1 className="my-auto">Tamaños y Precios</h1>
                    </div>

                    <div className="col-sm-3 d-flex my-auto px-0 py-2 py-sm-0 ">
                        <button className="btn btn-primary ms-auto col-12 col-sm-auto" onClick={toggleNew}><i className="fas fa-plus me-1"></i> Nuevo</button>
                    </div>

                </div>
            </div>
            <div className="container overflow-auto" style={{ height: "68vh" }}>
                <div className="row ">
                    {precios.map(precio => <Precio key={precio._id} precio={precio} borrar={borrarPrecioArray} getPrecios={getPrecios} selectPrecio={selectPrecio} toggleEdit={toggleEdit} toggleDelete={toggleDelete} />)}
                </div>
            </div>
        </>
    );
}

export default PantallaTamaniosPrecios;