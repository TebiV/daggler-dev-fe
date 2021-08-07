import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from "./components/auth/Login";
import Header from './components/Header';
import SubidaFotos from './components/fotografias/SubidaFotos';
import FormDatosCliente from './components/compras/FormDatosCliente';
import Albumes from './components/albumes/Albumes';
import Logout from './components/auth/Logout';
import RequireAuth from './components/auth/RequireAuth';
import { rutaAdminAlbumes, rutaAdminCrearAlbum, rutaAdminEventos, rutaAdminLogin, rutaAdminLogout, rutaAdminPedidos, rutaAdminPrecios } from './components/rutas/RutasAdmin';


import AdminAlbumes from './components/vistaAlbumes/AdminAlbumes';
import AdminPedidos from './components/vistaPedidos/AdminPedidos';
import AdminEventos from './components/vistaEventos/AdminEventos';
import AdminPrecios from './components/vistaPrecios/AdminPrecios';
import AdminCrearAlbum from './components/vistaAlbumes/AdminCrearAlbum';
import { AlbumesProvider, useAlbumes } from './context/AlbumesContext';

import SubidaFotos from './components/fotografias/SubidaFotos';
import { CategoriasProvider } from './context/CategoriasContext';

export default () => <CategoriasProvider><App></App></CategoriasProvider>


function App() {
  return (
    <div>
      <Router>
        <Switch>

          {/* //CADA UNA DE LAS DIFERENTES PAGINAS. */}
          {/* <Route exact path = '/' component {Home}/>
        <Route exact path = '/' component {Login}/>
        <Route exact path = '/fotografias' component {Albumes}/> */}


        {/* rutas admin (LAS DE LOGIN Y LOGOUT NO HAY QUE PROTEGERLAS)*/}
        <Route exact path={rutaAdminLogin} component={Login}/>
        <Route exact path={rutaAdminLogout} component={Logout}/>
        <Route exact path={rutaAdminAlbumes} component={() => <RequireAuth Component={AdminAlbumes}/>}/>
        <Route exact path={rutaAdminCrearAlbum} component={() => <RequireAuth Component={AdminCrearAlbum}/>}/>
        <Route exact path={rutaAdminPedidos} component={() => <RequireAuth Component={AdminPedidos}/>}/>
        <Route exact path={rutaAdminEventos} component={() => <RequireAuth Component={AdminEventos}/>}/>
        <Route exact path={rutaAdminPrecios} component={() => <RequireAuth Component={AdminPrecios}/>}/>

        <Route exact path="/subir-fotos" component={SubidaFotos}/>
        <Route exact path="/carrito-2" component={FormDatosCliente}/>
        <Route exact path = "/albumes" component={Albumes}/>
        <Route exact  component={Header} />
        
      </Switch>
    </Router>

    </div>
  );
}

