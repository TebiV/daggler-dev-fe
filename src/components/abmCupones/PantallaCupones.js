import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { apiGetCupones } from '../apis/apis';
import Navbar from '../layout/Navbar';
import SpinnerAbm from '../layout/SpinnerAbm';
import Cupon from './Cupon';
import DeleteCupon from './DeleteCupon';
import DisabledCupon from './DisabledCupon';
import EditCupon from './EditCupon';
import NewCupon from './NewCupon';


function PantallaCupones() {
    const token = useSelector(state => state.tokenReducer);

    const [isLoading, setIsLoading] = useState(true);
    const [cupones, setCupones] = useState([]);

    const [selectedCupon, setSelectedCupon] = useState({});


    const [showNew, setShowNew] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const [showDisabledCupon, setShowDisabledCupon] = useState(false);

    function toggleShowDisabledCupon(){
        setShowDisabledCupon(!showDisabledCupon);
    }
    function toggleNew() {
        setShowNew(!showNew);
    }
    function toggleEdit() {
        setShowEdit(!showEdit);
    }
    function toggleDelete() {
        setShowDelete(!showDelete);
    }


    async function getCupones() {
        const url = apiGetCupones;
        setIsLoading(true);
        await axios.get(url, { headers: { 'Authorization': token } })
            .then((res) => {
                setCupones(res.data.data);
                setIsLoading(false);
            });

    }

    function validateName(name) {
        let repetidos = cupones.filter(cupon => cupon.name === name)
        if (repetidos.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    useEffect(() => {
        getCupones();
    }, [])
    return (<>
        <Navbar />
        <NewCupon show={showNew} handleClose={toggleNew} getCupones={getCupones} validateName={validateName} />
        <EditCupon show={showEdit} handleClose={toggleEdit} cupon={selectedCupon} getCupones={getCupones} validateName={validateName} />
        <DeleteCupon show={showDelete} handleClose={toggleDelete} cupon={selectedCupon} getCupones={getCupones} />
        <div className="container mt-5 mb-4">
            
            <div className="row d-flex mx-1 mx-sm-0">
                <div className="col-sm-12 col-md-3 px-0 text-center text-sm-start mb-2 mb-md-0">
                    <h1 className="my-auto">Cupones</h1>
                </div>

                <div className="col-8 col-md-7 px-0 d-flex align-items-center justify-content-start justify-content-md-end">
                    <span>Mostrar expirados</span>
                    <label className="switch ms-2 col-4" >
                        <input type="checkbox" value={showDisabledCupon} onChange={toggleShowDisabledCupon}/>
                        <span className="slider round"></span>
                    </label>
                </div>

                <div className="col-4 col-md-2 d-flex my-auto px-0 py-2 py-sm-0 ">
                    <button className="btn btn-primary ms-auto" onClick={toggleNew}><i className="fas fa-plus me-1"></i> Nuevo</button>
                </div>
            </div>
        </div>
        <div className="container overflow-auto" style={{ height: "68vh" }}>
            {
                isLoading 
                ?
                <SpinnerAbm/>
                :
                <div className="row ">
                {cupones.map(cupon => {
                    if (cupon.enable) {
                        return <Cupon key={cupon._id} cupon={cupon} select={setSelectedCupon} onDelete={toggleDelete} onEdit={toggleEdit} />
                    } else {
                        return <DisabledCupon key={cupon._id} cupon={cupon} select={setSelectedCupon} onDelete={toggleDelete} onEdit={toggleEdit} show={showDisabledCupon} disabled/>
                    }
                })}
            </div>
            }
            {/* <div className="row ">
                {cupones.map(cupon => {
                    if (cupon.enable) {
                        return <Cupon key={cupon._id} cupon={cupon} select={setSelectedCupon} onDelete={toggleDelete} onEdit={toggleEdit} />
                    } else {
                        return <DisabledCupon key={cupon._id} cupon={cupon} select={setSelectedCupon} onDelete={toggleDelete} onEdit={toggleEdit} show={showDisabledCupon} disabled/>
                    }
                })}
            </div> */}
        </div>
    </>);
}

export default PantallaCupones;