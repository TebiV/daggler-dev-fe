import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import NavbarAdmin from '../layout/NavbarAdmin';
import Cupon from './Cupon';
import DeleteCupon from './DeleteCupon';
import NewCupon from './NewCupon';
// import NewPrecio from './NewPrecio';
// import Precio from './Precio';
// import EditPrecio from './EditPrecio';
// import DeletePrecio from './DeletePrecio';

function PantallaCupones() {
    const token = useSelector(state => state.tokenReducer);

    const [cupones, setCupones] = useState([]);

    const [selectedCupon, setSelectedCupon] = useState({});


    const [showNew, setShowNew] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    function toggleNew() {
        setShowNew(!showNew);
    }
    function toggleDelete() {
        setShowDelete(!showDelete);
    }
    // console.log(typeof cupones);
    async function getCupones() {
        const url = 'https://sod-daggler-be.herokuapp.com/api/coupon/get';
        await axios.get(url, { headers: { 'Authorization': token } })
            .then((res) => {
                setCupones(res.data.data);
            });
    }

    useEffect(() => {
        getCupones();
    }, [])
    return (<>
        <NavbarAdmin />
        <NewCupon show={showNew} handleClose={toggleNew} getCupones={getCupones} />
        <DeleteCupon show={showDelete} handleClose={toggleDelete} cupon={selectedCupon} getCupones={getCupones} />
        <div className="container mt-5 mb-4">
            <div className="row d-flex ">

                <div className="col-sm-6 px-0">
                    <h1 className="my-auto">Cupones</h1>
                </div>

                <div className="col-sm-6 d-flex my-auto px-0">
                    <button className="btn btn-primary ms-auto" onClick={toggleNew}><i className="fas fa-plus me-1"></i> Nuevo</button>
                </div>
            </div>
        </div>
        <div className="container overflow-auto" style={{ height: "68vh" }}>
            <div className="row ">
                {cupones.map(cupon => {
                    if (cupon.enable) {
                        return <Cupon key={cupon._id} cupon={cupon} select={setSelectedCupon} onDelete={toggleDelete} />
                    }
                    return null;
                })}
            </div>
        </div>
    </>);
}

export default PantallaCupones;