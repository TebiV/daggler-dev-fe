import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { rutaAdminCrearAlbum } from '../rutas/RutasAdmin';
import TarjetaAlbum from './TarjetaAlbum';
import { useCategorias } from '../../context/CategoriasContext';
import { apiDeleteAlbumId, apiDeleteAlbumIdd } from '../apis/apis';
import { DAGGLER_ADMIN } from '../token tags/DAGGLER_ADMIN';
import ModalConfirmacion from '../layout/ModalConfirmacion';
import $ from 'jquery';
const ListadoAlbumes = () => {
    //estilo hardcodeado para el div con la lista de albumes
    const style = { maxHeight: 0.7 * (window.innerHeight) }

    //hook que guarda los albumes
    const [albumes, setAlbumes] = useState([])

    //hook de busqueda 
    const [inputSearch, setInputSearch] = useState('')

    //hook creado en CategoriasContext
    const { filtroCategoria, categorias, selectCategoria } = useCategorias()

    //si el usuario hace clic en el boton eliminar de algun album, su id se guarda aca
    const [albumAEliminar, setalbumAEliminar] = useState({})

    //obtiene los albumes segun el filtro seleccionado
    useEffect(() => {
        const getAlbumes = async () => {
            const url = `https://sod-daggler-be.herokuapp.com/api/album/${filtroCategoria}`
            const resultado = await axios.get(url)
            setAlbumes(resultado.data)
        }
        getAlbumes()
    }, [filtroCategoria])



    function eliminarAlbum(albumId) {

        const url = apiDeleteAlbumId(albumId)
        console.log(url)
        const h = new Headers();
        h.append('Authorization', window.localStorage.getItem(DAGGLER_ADMIN));
        fetch(url, {
            method: 'DELETE',
            headers: h
        }).then(res => console.log(res))

        setAlbumes(albumes.filter((album) =>
            album._id !== albumId
        ))
    }



    return (
        <>

            <div className="container mt-3">

                <ModalConfirmacion album={albumAEliminar} onEliminar={eliminarAlbum} />

                <h1>Álbumes</h1>

                <div className="mt-4 row px-2 px-sm-0">

                    <div className="col-lg-5 col-sm-8 me-auto pe-1 d-flex" >

                        <div className="dropdown">
                            <button
                                className="btn btn-secondary dropdown-toggle"
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

                        <form className="d-flex flex-fill ps-3 ">
                            <input
                                className="form-control me-2"
                                type="search"
                                value={inputSearch}
                                onChange={(e) => setInputSearch(e.target.value)}
                                placeholder={"Buscar álbum..."}
                                aria-label="Search"
                            ></input>
                        </form>
                    </div>



                    <div className="row col-lg-7 col-sm-4 col-12 m-0 mt-2 mt-sm-0 mt-md-0" >
                        <button
                            className="btn btn-warning col-xl-2 col-lg-3 col-sm-8 col-md-6 ms-sm-auto "
                            id="aaasd"
                            onClick={() => window.location.pathname = rutaAdminCrearAlbum}
                        >
                            <i className="fas fa-plus me-1"></i> Añadir
                        </button>

                    </div>
                </div>

                <div style={style} className="overflow-auto mt-3 p-2">

                    {albumes.length !== 0
                        ? albumes.map((album) => <TarjetaAlbum key={album._id} album={album} onEliminar={setalbumAEliminar} />)
                        : "noai nada xD"}
                </div>
            </div>

        </>
    );
}

export default ListadoAlbumes;