import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { apiGetCategories } from '../apis/apis';
import NavbarAdmin from '../layout/NavbarAdmin';
import Categoria from './Categoria';
import DeleteCategoria from './DeleteCategoria';
import EditCategoria from './EditCategoria';
import NewCategoria from './NewCategoria';

function PantallaCategorias() {

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
        const resultado = await axios.get(url)
        setCategorias(resultado.data)
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
            <NavbarAdmin />
            <NewCategoria show={showNew} handleClose={toggleNew} getCategorias={getCategorias} />
            <EditCategoria show={showEdit} handleClose={toggleEdit} categoria={selectedCateg} getCategorias={getCategorias} />
            <DeleteCategoria show={showDelete} handleClose={toggleDelete} categoria={selectedCateg} borrarCategoria={borrarCategoria}/>
            <div className="container mt-5 mb-4">
                <div className="row d-flex ">

                    <div className="col-sm-6 px-0">
                        <h1 className="my-auto">Categorías</h1>
                    </div>

                    <div className="col-sm-6 d-flex my-auto px-0">
                        <button className="btn btn-primary ms-auto" onClick={toggleNew}><i className="fas fa-plus me-1"></i> Nueva</button>
                    </div>
                </div>
            </div>
            <div className="container overflow-auto" style={{ height: "68vh" }}>
                <div className="row ">
                    {categorias.map(categoria => <Categoria key={categoria._id} categoria={categoria} selectCategoria={selectCategoria} toggleEdit={toggleEdit} toggleDelete={toggleDelete} />)}
                </div>
            </div>
        </>
    );
}

export default PantallaCategorias;