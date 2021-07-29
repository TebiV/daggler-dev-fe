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
import AdminAlbumes from './components/admin/albumes/AdminAlbumes';
import AdminPedidos from './components/admin/AdminPedidos';
import AdminEventos from './components/admin/AdminEventos';
import AdminPrecios from './components/admin/AdminPrecios';
import AdminCrearAlbum from './components/admin/albumes/AdminCrearAlbum';
import FotografiasAlbum from './components/fotografias/fotosEnAlbumes/FotografiasAlbum';

function App() {
  return (
    <div>
      <Router>
      <Route exact  component={Header} />
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

        <Route path="/subir-fotos" component={SubidaFotos}/>
        <Route exact path="/carrito-2" component={FormDatosCliente}/>
        <Route exact path = "/albumes" component={Albumes}/>
        <Route exact path="/photos/:albumid" component={FotografiasAlbum}/>
        
        
      </Switch>
    </Router>
    </div>
  );
}

export default App;
