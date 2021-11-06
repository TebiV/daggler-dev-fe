import React from 'react';
import { NavLink } from 'react-router-dom';
import { rutaAdminAlbumes, rutaAdminLogout, rutaAdminPedidos, rutaAdminTamaniosPrecios, rutaAdminCategorias, rutaAdminCupones, rutaAdminPrecios } from '../routes/RutasAdmin';
import { useHistory } from 'react-router';

const Navbar = () => {

    const history = useHistory();
    const itemsNavbar = [
        { id: "1", nombre: 'Álbumes', ruta: rutaAdminAlbumes },
        { id: "2", nombre: 'Pedidos', ruta: rutaAdminPedidos },
        { id: "3", nombre: 'Cupones', ruta: rutaAdminCupones },
        { id: "4", nombre: 'Categorías', ruta: rutaAdminCategorias },
        { id: "5", nombre: 'Tamaños y precios', ruta: rutaAdminTamaniosPrecios },
        { id: "6", nombre: 'Homepage', ruta: "asdasd" },
        
    ]
    return (
        <nav className="navbar  navbar-expand-lg navbar-dark ">
            <div className="container-fluid">
                <a className="navbar-brand" href="/"> <img src="../../../Logoboton.png" alt="logo" href="/" className="ms-3" style={{ height: '3rem'}}/> </a>

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
                        {itemsNavbar.map((item) => {
                            return (
                                <NavLink
                                    key={item.id}
                                    to={item.ruta}
                                    className="nav-link"
                                    activeClassName="active"
                                >
                                    {item.nombre}
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
                            <i className="fas fa-user me-2"></i> Perfil
                        </span>
                        <ul className=" dropdown-menu dropdown-menu-end" aria-labelledby="dropdownPerfil">
                            <li><button className="dropdown-item" href="#">Cambiar contraseña</button></li>
                            <li><button className="dropdown-item d-flex justify-content-between" onClick={() => { history.push({ pathname: rutaAdminLogout }) }}>Cerrar Sesión <i className="fas fa-power-off my-auto"/> </button></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;