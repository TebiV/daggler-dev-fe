import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from "./components/auth/Login";
import Navbar from './components/layout/NavbarAdmin';

import Logout from './components/auth/Logout';
import RequireAuth from './components/auth/RequireAuth';
import { rutaAdminAlbumes, rutaAdminCrearAlbum, rutaAdminEventos, rutaAdminLogin, rutaAdminLogout, rutaAdminPedidos, rutaAdminPrecios } from './components/rutas/RutasAdmin';


import AdminAlbumes from './components/vistaAlbumes/AdminAlbumes';
import AdminPedidos from './components/vistaPedidos/AdminPedidos';
import AdminEventos from './components/vistaEventos/AdminEventos';
import AdminPrecios from './components/vistaPrecios/AdminPrecios';
import AdminCrearAlbum from './components/vistaAlbumes/AdminCrearAlbum';
import { AlbumesProvider, useAlbumes } from './context/AlbumesContext';

import { CategoriasProvider } from './context/CategoriasContext';

import AdminSubidaFotos from './components/fotografias/AdminSubidaFotos';

export default () => <CategoriasProvider><App></App></CategoriasProvider>


function App() {
  return (
    <div>
      <Router>
        <Switch>

        <Route exact path={rutaAdminLogin} component={Login}/>
        <Route exact path={rutaAdminLogout} component={Logout}/>
        <Route exact path={rutaAdminAlbumes} component={() => <RequireAuth Component={AdminAlbumes}/>}/>
        <Route exact path={rutaAdminCrearAlbum} component={() => <RequireAuth Component={AdminCrearAlbum}/>}/>
        <Route exact path={rutaAdminPedidos} component={() => <RequireAuth Component={AdminPedidos}/>}/>
        <Route exact path={rutaAdminEventos} component={() => <RequireAuth Component={AdminEventos}/>}/>
        <Route exact path={rutaAdminPrecios} component={() => <RequireAuth Component={AdminPrecios}/>}/>

        
        <Route exact path="/subir-foto/:albumid" component={()=><RequireAuth Component={AdminSubidaFotos}/> }/>
        
      </Switch>
    </Router>

    </div>
  );
}