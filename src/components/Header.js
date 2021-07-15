import React from "react";

function Header() {

    //Array de categorias hardcodeado
    const categorias = [
        { nombre: 'XV' },
        { nombre: 'Casamientos' },
        { nombre: 'Egresos' },
        { nombre: 'Fiestas' }
    ]

    const [inputBusqueda, setInputBusqueda] = React.useState("");
    function handleChangeBusqueda(event) {
        const newValue = event.target.value;
        setInputBusqueda(newValue);
    }

    //function que se ejecuta cuando haces click en el boton de buscar, falta implementar la busqueda
    function buscar(event) {
        //el preventDefault evita que se refresque la pagina cuando apretas el boton
        event.preventDefault();
    }

    //falta hacer que se subraye el item del header que se clickee, va a depender de si hacemos un route para cada categoria o no.
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Daggler Studio</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        {categorias.map((categoria) => {
                            return (
                                <li class="nav-item">
                                    <a class="nav-link" aria-current="page" href="#">{categoria.nombre}</a>
                                </li>)
                        })}
                    </ul>
                    <form class="d-flex">
                        <input class="form-control me-2" value={inputBusqueda} onChange={handleChangeBusqueda} type="search" placeholder="Buscar álbum..." aria-label="Search"></input>
                        <button class="btn btn-warning" onClick={buscar} type="submit">Buscar</button>
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default Header;