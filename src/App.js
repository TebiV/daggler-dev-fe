import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from "./components/auth/Login";
import Logout from './components/auth/Logout';
import RequireAuth from './components/auth/RequireAuth';

import { rutaAdminAlbumes, rutaAdminCrearAlbum, rutaAdminEventos, rutaAdminLogin, rutaAdminLogout, rutaAdminPedidos, rutaAdminPrecios } from './components/rutas/RutasAdmin';

import AdminAlbumes from './components/vistaAlbumes/AdminAlbumes';
import AdminPedidos from './components/admin/AdminPedidos';
import AdminEventos from './components/vistaEventos/AdminEventos';
import AdminPrecios from './components/admin/AdminPrecios';
import AdminCrearAlbum from './components/vistaAlbumes/AdminCrearAlbum';

function App() {
  return (
    <div>
      <Router>

        <Switch>

          <Route exact path={rutaAdminLogin} component={Login} />
          <Route exact path={rutaAdminLogout} component={Logout} />
          <Route exact path={rutaAdminAlbumes} component={() => <RequireAuth Component={AdminAlbumes} />} />
          <Route exact path={rutaAdminCrearAlbum} component={() => <RequireAuth Component={AdminCrearAlbum} />} />
          <Route exact path={rutaAdminPedidos} component={() => <RequireAuth Component={AdminPedidos} />} />
          <Route exact path={rutaAdminEventos} component={() => <RequireAuth Component={AdminEventos} />} />
          <Route exact path={rutaAdminPrecios} component={() => <RequireAuth Component={AdminPrecios} />} />


        </Switch>
      </Router>
    </div>
  );
}

export default App;
