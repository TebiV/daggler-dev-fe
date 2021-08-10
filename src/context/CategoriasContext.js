import React, { createContext, useEffect, useState, useMemo } from 'react';
import axios from 'axios';

const CategoriasContext = createContext();



export function CategoriasProvider(props) {


    //hook que guarda la categoria seleccionada, originalmente esta seleccionado XV
    const [filtroCategoria, setfiltroCategoria] = useState('XV')

    //hook que guarda una lista con todas las categorias
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


    //con esta funcion se cambia la categoria seleccionada
    function selectCategoria(e) {
        setfiltroCategoria(e.target.value)
    }

    //esta constante es la que retorna, el useMemo sirve para que se refresquen los objetos solo 
    //cuando alguno de los 2 cambia. Lo use por un tema de eficiencia y xq el chabon del video lo hacia asi XD.
    const value = useMemo(() => {
        return ({
            filtroCategoria,
            categorias,
            selectCategoria
        })
    }, [categorias, filtroCategoria])

    return <CategoriasContext.Provider value={value} {...props} />

}

export function useCategorias() {
    const context = React.useContext(CategoriasContext)
    if (!context) {
        throw new Error("useCategorias debe estar adentro del provider CategoraisContext.")
    }
    return context;
}

