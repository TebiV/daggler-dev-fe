import React from 'react';
import { NavLink } from 'react-router-dom';
import { rutaAdminAlbumes, rutaAdminLogout, rutaAdminPedidos, rutaAdminTamaniosPrecios, rutaAdminCategorias, rutaAdminCupones } from '../routes/RutasAdmin';
import { useHistory } from 'react-router';

const Navbar = () => {

    const history = useHistory();
    const categoriasAdmin = [
        { id: "1", nombre: 'Álbumes', ruta: rutaAdminAlbumes },
        { id: "2", nombre: 'Pedidos', ruta: rutaAdminPedidos },
        { id: "4", nombre: 'Cupones', ruta: rutaAdminCupones }
        
    ]
    return (
        <nav className="navbar  navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/"> <span style={{ color: '#E6AC00', fontWeight: '700' }}>Daggler</span> Studio </a>

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
                                    key={categoria.id}
                                    to={categoria.ruta}
                                    className="nav-link"
                                    activeClassName="active"
                                >
                                    {categoria.nombre}
                                </NavLink>
                            )
                        })}
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="/#" id="navbarDropdownConfiguracion" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Configuración
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownConfiguracion">
                                <li>
                                    <button
                                        className="dropdown-item"
                                        onClick={() => { history.push({ pathname: rutaAdminTamaniosPrecios }) }}
                                    >Tamaños y Precios
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="dropdown-item"
                                        onClick={() => { history.push({ pathname: rutaAdminCategorias }) }}
                                    >Categorías
                                    </button>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <div className="navbar-nav btn-group ms-auto">
                        <span
                            className="nav-link dropdown-toggle"
                            type="button" id="dropdownPerfil"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <i className="fas fa-user me-2"></i> Perfil
                        </span>
                        <ul className=" dropdown-menu dropdown-menu-end" aria-labelledby="dropdownPerfil">
                            <li><button className="dropdown-item" href="#">Cambiar contraseña</button></li>
                            <li><button className="dropdown-item" onClick={() => { history.push({ pathname: rutaAdminLogout }) }}><b><i className="fas fa-power-off"></i> Cerrar Sesión</b> </button></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;