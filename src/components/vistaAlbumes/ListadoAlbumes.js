import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { rutaAdminCrearAlbum } from '../routes/RutasAdmin';
import { useCategorias } from '../../context/CategoriasContext';
import '../../css/ListadoAlbumes_css.css';
import { useSelector } from 'react-redux';
import Album from './Album';
import SpinnerAbm from '../layout/SpinnerAbm';
import DeleteAlbum from './DeleteAlbum';
import { useHistory } from 'react-router';
import Navbar from '../layout/Navbar';


function ListadoAlbumes() {

    const history = useHistory();
    const token = useSelector(state => state.tokenReducer);

    const [showDelete, setShowDelete] = useState(false);
    function toggleDelete() {
        setShowDelete(!showDelete)
    }
    //hook que guarda los albumes
    const [albumes, setAlbumes] = useState([])

    //hook que contiene los albumes que coinciden con el string ingresado en el cuadro de busqueda
    const [albumesSearch, setAlbumesSearch] = useState([])

    //hook de busqueda 
    const [inputSearch, setInputSearch] = useState('')

    //hook creado en CategoriasContext
    const { filtroCategoria, categorias, selectCategoria } = useCategorias()

    //sirve para szaber cuando mostrar el spinner de carga 
    const [isLoading, setIsLoading] = useState(true)

    //si el usuario hace clic en el boton eliminar de algun album, su id se guarda aca
    const [selectedAlbum, setSelectedAlbum] = useState({})
    function select(album) {
        setSelectedAlbum(album)
    }
    //obtiene los albumes segun el filtro seleccionado
    const getAlbumes = async () => {
        setIsLoading(true)
        const url = `https://sod-daggler-be.herokuapp.com/api/album/${filtroCategoria}`
        const resultado = await axios.get(url, { headers: { 'Authorization': token } })
        setAlbumes(resultado.data)
        setIsLoading(false)
    }
    useEffect(() => {
        getAlbumes()
    }, [filtroCategoria, token])

    useEffect(() => {
        setAlbumesSearch(
            albumes.filter(
                (album) => album.name.toLowerCase().includes(inputSearch.toLowerCase())
            )
        )
    }, [inputSearch])


    return (
        <>
            <Navbar />
            <DeleteAlbum show={showDelete} handleClose={toggleDelete} album={selectedAlbum} getAlbumes={getAlbumes} />
            <div className="container mt-5 mb-2">
                <div className="row d-flex">

                    <div className="text-center text-md-start my-1 my-sm-auto col-md-auto">
                        <h1 className="my-auto">Álbumes</h1>
                    </div>


                    <div className="col-auto my-1 my-sm-auto">
                        <div className="dropdown">
                            <button
                                className="btn btn-light dropdown-toggle"
                                type="button"
                                id="dropdownFiltroCategoria"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {filtroCategoria}
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownFiltroCategoria">
                                {categorias.map(categoria => (
                                    <li key={categoria._id}>
                                        <button

                                            value={categoria.name}
                                            className="dropdown-item"
                                            onClick={selectCategoria}
                                        >
                                            {categoria.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>


                    <div className="col-auto my-1 py-auto my-sm-auto col-sm-auto flex-fill flex">
                        <form className="" onSubmit={(e) => { e.preventDefault() }}>
                            <input
                                className="form-control"
                                type="search"
                                value={inputSearch}
                                onChange={(e) => setInputSearch(e.target.value)}
                                placeholder={"Buscar álbum..."}
                                aria-label="Search"

                            ></input>
                        </form>
                    </div>

                    <div className="my-1 d-flex justify-content-end col-12 col-sm-auto">
                        <button className="btn btn-primary ms-auto col-12 col-sm-auto" onClick={() => history.push({ pathname: rutaAdminCrearAlbum })}>
                            <i className="fas fa-plus me-1"></i> Nuevo
                        </button>
                    </div>
                </div>
            </div>

            {isLoading
                ?
                <SpinnerAbm />
                :
                <div className="container overflow-auto" style={{ height: "75vh" }}>
                    {inputSearch.length > 0
                        ?
                        (albumesSearch.length > 0
                            ?
                            <div className="row ">
                                {albumesSearch.map(album => <Album key={album._id} album={album} select={select} onDelete={toggleDelete} />)}
                            </div>
                            :
                            <div className="m-auto d-flex" style={{ height: "75vh" }}>
                                <div className="text-danger m-auto text-center">
                                    <h1 className="bi bi-x-circle m-auto icono-sinResultados"></h1>
                                    <h3>Sin resultadosss</h3>
                                </div>
                            </div>
                        )
                        :
                        <div className="row ">
                            {albumes.map(album => <Album key={album._id} album={album} select={select} onDelete={toggleDelete} />)}
                        </div>
                    }
                </div>
            }
        </>)
}
export default ListadoAlbumes;