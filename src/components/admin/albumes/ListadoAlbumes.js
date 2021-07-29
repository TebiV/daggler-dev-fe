import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { rutaAdminCrearAlbum } from '../../rutas/RutasAdmin';
import TarjetaAlbum from './TarjetaAlbum';

const ListadoAlbumes = () => {
    //hook que guarda los albumes
    const [albumes, setAlbumes] = useState([])

    //hook que guarda la categoria seleccionada, originalmente esta seleccionado XV
    const [filtroCateg, setFiltroCateg] = useState('XV')

    //hook que guarda todas las categorias
    const [categorias, setCategorias] = useState([])

    //hook de busqueda 
    const [inputSearch, setInputSearch] = useState('')


    //obtiene las categorias para filtrar
    useEffect(() => {
        const getCategorias = async () => {
            const url = 'https://sod-daggler-be.herokuapp.com/api/category/allCategory'
            const resultado = await axios.get(url)
            setCategorias(resultado.data)
        }
        getCategorias();
    }, [])

    //obtiene los albumes segun el filtro seleccionado
    useEffect(() => {
        const getAlbumes = async () => {
            const url = `https://sod-daggler-be.herokuapp.com/api/album/${filtroCateg}`
            const resultado = await axios.get(url)
            setAlbumes(resultado.data)
        }
        getAlbumes()
    }, [filtroCateg])


    //actualiza el hook que contiene la categoria filtro 
    //(no se si hace falta, se podria poner el setFiltroCateg directamente en el onChange)
    function selectFiltro(e) {
        setFiltroCateg(e.target.value)
    }

    //estilo hardcodeado para el div con la lista de albumes
    const style = { maxHeight: 0.7 * (window.innerHeight) }

    return (
        <>
            <div className="container mt-3 ">

                <h1>Álbumes</h1>

                <div className="mt-4 mr-5 d-flex">

                    <div className="col-lg-5 me-auto d-flex">

                        <div className="dropdown">
                            <button
                                className="btn btn-warning dropdown-toggle"
                                type="button"
                                id="dropdownFiltroCategoria"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {filtroCateg}
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownFiltroCategoria">
                                {categorias.map(categoria => (
                                    <li>
                                        <button
                                            key={categoria._id}
                                            value={categoria.name}
                                            className="dropdown-item"
                                            onClick={selectFiltro}
                                        >
                                            {categoria.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <form className="d-flex ps-3">
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

                    <div className="btn-group">
                        <button
                            className="btn btn-secondary"
                            onClick={() => window.location.pathname = rutaAdminCrearAlbum}
                        >
                            <i class="fas fa-plus me-1"></i> Añadir
                        </button>
                        <button
                            className="btn btn-secondary"
                            onClick={() => alert("eliminar no implementado")}
                        >
                            <i class="fas fa-trash me-1"></i> Eliminar
                        </button>
                    </div>
                </div>

                <div style={style} className="overflow-auto mt-3">

                    {albumes.length !== 0
                        ? albumes.map((album) => <TarjetaAlbum album={album} />)
                        : "noai nada xD"}
                </div>
            </div>
        </>
    );
}

export default ListadoAlbumes;
