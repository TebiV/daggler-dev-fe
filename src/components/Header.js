import React from "react";
import { NavLink } from "react-router-dom";

function Header() {

    //Array de categorias hardcodeado
    /*
    const categorias = [
        { nombre: 'XV', ruta:'xv' },
        { nombre: 'Casamientos', ruta:'casamientos' },
        { nombre: 'Egresos', ruta:'egresos' },
        { nombre: 'Fiestas', ruta:'fiestas' }
    ]*/

    //este array de aca abajo es para testear en el admin, en el return está hardcodeado este array, no el anterior
    const categorias2 = [
        { nombre: "Login", ruta: 'login' },
        { nombre: "Nuevo Álbum", ruta: 'new-album' }
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
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="localhost:3000/"> Daggler Studio </a>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">

                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        {categorias2.map((categoria) => {
                            return (
                                
                                <li className="nav-item"
                                key={categoria.nombre}
                                >
                                    {/* <a
                                        class={"nav-link " + (props.ruta === categoria.ruta ? "active" : null)} 
                                        aria-current="page" 
                                        href={categoria.ruta}
                                    >
                                        {categoria.nombre}
                                    </a> */}
                                    <NavLink
                                        to={categoria.ruta}
                                        className="nav-link"
                                        activeClassName="active"
                                    >
                                        {categoria.nombre}
                                    </NavLink>
                                </li>
                            )
                        })}
                    </ul>

                    <form className="d-flex">
                        <input className="form-control me-2" value={inputBusqueda} onChange={handleChangeBusqueda} type="search" placeholder="Buscar álbum..." aria-label="Search"></input>
                        <button className="btn btn-warning" onClick={buscar} type="submit">Buscar</button>
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default Header;