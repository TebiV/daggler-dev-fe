import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { apiGetCategories } from '../apis/apis';
import SpinnerAbm from '../layout/SpinnerAbm';
import Categoria from './Categoria';
import DeleteCategoria from './DeleteCategoria';
import EditCategoria from './EditCategoria';
import NewCategoria from './NewCategoria';

function PantallaCategorias() {

    const [isLoading, setIsLoading] = useState(true);

    const [showNew, setShowNew] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    function toggleNew() { setShowNew(!showNew) }
    function toggleEdit() { setShowEdit(!showEdit) }
    function toggleDelete() { setShowDelete(!showDelete) }

    const [categorias, setCategorias] = useState([]);
    const [selectedCateg, selectCategoria] = useState({});

    async function getCategorias() {
        const url = apiGetCategories;
        await axios.get(url)
            .then((res) => {
                setCategorias(res.data)
                setIsLoading(false)
            })


    }

    useEffect(() => {
        getCategorias();
    }, [])

    //elimina la categoria del array
    function borrarCategoria(categoriaDelete) {
        setCategorias(categorias.filter(categoria => categoria._id !== categoriaDelete._id))
    }


    return (
        <>
            <NewCategoria show={showNew} handleClose={toggleNew} getCategorias={getCategorias} />
            <EditCategoria show={showEdit} handleClose={toggleEdit} categoria={selectedCateg} getCategorias={getCategorias} />
            <DeleteCategoria show={showDelete} handleClose={toggleDelete} categoria={selectedCateg} borrarCategoria={borrarCategoria} />

            <div className="container mt-5 mb-4">
                <div className="row d-flex mx-2 mx-sm-0">

                    <div className="col-sm-9 px-0 text-center text-sm-start">
                        <h1 className="my-auto text-light">Categorías</h1>
                    </div>

                    <div className="col-sm-3 d-flex my-auto px-0 py-2 py-sm-0 ">
                        <button className="btn btn-primary ms-auto col-12 col-sm-auto" onClick={toggleNew}><i className="fas fa-plus me-1"></i> Nueva</button>
                    </div>
                </div>
            </div>
            <div className="container overflow-auto" style={{ height: "68vh" }}>
                {
                    isLoading
                        ?
                        <SpinnerAbm />
                        :
                        <div className="row ">
                            {categorias.map(categoria => <Categoria key={categoria._id} categoria={categoria} selectCategoria={selectCategoria} toggleEdit={toggleEdit} toggleDelete={toggleDelete} />)}
                        </div>
                }
            </div>
        </>
    );
}

export default PantallaCategorias;