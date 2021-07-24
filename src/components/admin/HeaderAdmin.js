
import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
const HeaderAdmin = () => {

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#"> Daggler Studio </a>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent2"
                    aria-controls="navbarSupportedContent2"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent2">

                    <ul className="navbar-nav mb-2 mb-lg-0">

                        <div className="d-flex"> </div>

                    </ul>

                    <div className="navbar-nav btn-group ms-auto">
                        <span
                            className="nav-link dropdown-toggle"
                            type="button" id="dropdownPerfil"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >Perfil</span>
                        <ul className=" dropdown-menu dropdown-menu-end" aria-labelledby="dropdownPerfil">

                            <li><button className="dropdown-item" href="#">Cambiar contraseña</button></li>
                            <li><button className="dropdown-item" href="#">alguna webada mas</button></li>
                            <li><a className="dropdown-item" href="/admin/logout">Cerrar Sesión</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default HeaderAdmin;