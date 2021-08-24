import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { rutaAdminCrearAlbum } from '../rutas/RutasAdmin';
import TarjetaAlbum from './TarjetaAlbum';
import { useCategorias } from '../../context/CategoriasContext';
import { apiDeleteAlbumId, apiDeleteAlbumIdd } from '../apis/apis';
import { DAGGLER_ADMIN } from '../token tags/DAGGLER_ADMIN';
import ModalConfirmacion from '../layout/ModalConfirmacion';
import '../../css/ListadoAlbumes_css.css'
const ListadoAlbumes = () => {
    //estilo hardcodeado para el div con la lista de albumes
    const style = { maxHeight: 0.7 * (window.innerHeight) }

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
    const [albumAEliminar, setalbumAEliminar] = useState({})

    //obtiene los albumes segun el filtro seleccionado
    useEffect(() => {
        const getAlbumes = async () => {
            const url = `https://sod-daggler-be.herokuapp.com/api/album/${filtroCategoria}`
            const resultado = await axios.get(url)
            setAlbumes(resultado.data)
            setIsLoading(false)
        }
        getAlbumes()
    }, [filtroCategoria])

    useEffect(() => {
        setAlbumesSearch(
            albumes.filter(
                (album) => album.name.toLowerCase().includes(inputSearch.toLowerCase())
            )
        )
    }, [inputSearch])

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

                        {/* el ternary operator que aparece aca abajo sirve para mostrar un spinner 
                        en el selector de categoria cuando aun no cargo los albumes, xq a veces 
                        las categorias tmb se tardan en cargar y en el dropdown no se ve nada */}
                        {isLoading ?
                            <button className="btn btn-secondary">
                                <div className="m-auto d-flex height-spinner d-flex flex-row">
                                    <div className="spinner-border spinner-border-sm text-light m-auto py-auto" role="status">
                                        <span className="visually-hidden">Cargando...</span>
                                    </div>
                                </div>
                            </button>
                            :
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
                        }


                        <form className="d-flex flex-fill ps-3 " onSubmit={(e)=>{e.preventDefault()}}>
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

                {isLoading
                    ?
                    <div className="m-auto d-flex height-spinner" style={{ height: "72vh" }}>
                        <div className="spinner-cargando-albumes spinner-border text-warning m-auto py-auto" role="status">
                            <span className="visually-hidden">Cargando...</span>
                        </div>
                    </div>
                    :


                    (
                        inputSearch.length > 0
                            ?
                            (albumesSearch.length > 0
                                ?
                                <div style={{ height: "72vh" }} className="overflow-auto mt-3 p-2">
                                    {albumesSearch.map((album) => <TarjetaAlbum key={album._id} album={album} onEliminar={setalbumAEliminar} />)}
                                </div>
                                :
                                <div className="m-auto d-flex" style={{ height: "72vh" }}>
                                    <div className="text-danger m-auto text-center">
                                        <h1 className="bi bi-x-circle m-auto icono-sinResultados"></h1>
                                        <h3>Sin resultados</h3>
                                    </div>
                                </div>
                            )
                            :
                            <div style={{ height: "72vh" }} className="overflow-auto mt-3 p-2">
                                {albumes.map((album) => <TarjetaAlbum key={album._id} album={album} onEliminar={setalbumAEliminar} />)}
                            </div>
                    )


                }

            </div>

        </>
    );
}

export default ListadoAlbumes;