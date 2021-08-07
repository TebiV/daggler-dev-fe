import React, { createContext, useEffect, useState, useMemo } from 'react';
import axios from 'axios';
const AlbumesContext = createContext();

export function AlbumesProvider(props) {
    //hook que guarda los albumes
    const [albumes, setAlbumes] = useState([])

    //hook que guarda la categoria seleccionada, originalmente esta seleccionado XV
    const [filtroCategoria, setfiltroCategoria] = useState('XV')

    //hook que guarda todas las categorias
    const [categorias, setCategorias] = useState([])

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
            const url = `https://sod-daggler-be.herokuapp.com/api/album/${filtroCategoria}`
            const resultado = await axios.get(url)
            setAlbumes(resultado.data)
        }
        getAlbumes()
    }, [filtroCategoria])

    function selectFiltro(e) {
        setfiltroCategoria(e.target.value)
    }

    //esta constante es la que retorna, el useMemo sirve para que se refresquen los objetos solo 
    //cuando alguno de los 2 cambia. Lo use por un tema de eficiencia y xq el chabon del video lo hacia asi XD.
    const value = useMemo(() => {
        return ({
            albumes,
            filtroCategoria,
            categorias,
            selectFiltro
        })
    }, [albumes, filtroCategoria])

    return <AlbumesContext.Provider value={value} {...props} />
}

export function useAlbumes() {
    const context = React.useContext(AlbumesContext)
    if (!context) {
        throw new Error("D:")
    }
    return context;
}