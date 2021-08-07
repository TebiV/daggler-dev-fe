
import React from 'react';
import { NavLink } from 'react-router-dom';
import {rutaAdminAlbumes, rutaAdminEventos, rutaAdminLogout, rutaAdminPedidos, rutaAdminPrecios} from '../rutas/RutasAdmin';
const NavbarAdmin = () => {

    const categoriasAdmin = [
        { nombre: 'Álbumes', ruta: rutaAdminAlbumes, _id: "0" },
        { nombre: 'Pedidos', ruta: rutaAdminPedidos, _id: "1"  },
        { nombre: 'Eventos', ruta: rutaAdminEventos, _id: "2"  },
        { nombre: 'Precios', ruta: rutaAdminPrecios, _id: "3"  }
    ]
    return (
        <nav className="navbar  navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#"> <span style={{color: '#E6AC00', fontWeight: '700'}}>Daggler</span> Studio </a>

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

                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {categoriasAdmin.map((categoria) => {
                            return (
                                <NavLink
                                    key={categoria._id}
                                    to={categoria.ruta}
                                    className="nav-link"
                                    activeClassName="active"
                                >
                                    {categoria.nombre}
                                </NavLink>
                            )
                        })}
                    </ul>
                    <div className="navbar-nav btn-group ms-auto">
                        <span
                            className="nav-link dropdown-toggle"
                            type="button" id="dropdownPerfil"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <i className="fas fa-user me-2"></i>
                            Perfil
                        </span>
                        <ul className=" dropdown-menu dropdown-menu-end" aria-labelledby="dropdownPerfil">

                            <li><button className="dropdown-item" href="#">Cambiar contraseña</button></li>
                            <li><button className="dropdown-item" href="#">alguna cosa mas</button></li>
                            <hr/>
                            <li><a className="dropdown-item" href={rutaAdminLogout}><b>Cerrar Sesión</b> </a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavbarAdmin;