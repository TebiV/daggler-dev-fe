import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Login from "./components/auth/Login";
import Logout from './components/auth/Logout';
import RequireAuth from './components/auth/RequireAuth';
import { rutaAdminAlbumes, rutaAdminCategorias, rutaAdminCrearAlbum, rutaAdminCupones, rutaAdminEventos, rutaAdminLogin, rutaAdminLogout, rutaAdminModificarAlbum, rutaAdminPedidos, rutaAdminPrecios, rutaAdminSubirFotos, rutaAdminTamaniosPrecios } from './components/routes/RutasAdmin';


import AdminAlbumes from './components/vistaAlbumes/AdminAlbumes';
import AdminPedidos from './components/vistaPedidos/AdminPedidos';
import AdminEventos from './components/vistaEventos/AdminEventos';
import AdminConfig from './components/vistaPrecios/AdminConfig';
import AdminCrearAlbum from './components/vistaAlbumes/AdminCrearAlbum';

import { CategoriasProvider } from './context/CategoriasContext';

import AdminSubidaFotos from './components/fotografias/AdminSubidaFotos';
import AdminModificarAlbum from './components/vistaAlbumes/AdminModificarAlbum';
import PantallaTamaniosPrecios from './components/abmTamaniosPrecios/PantallaTamaniosPrecios';
import PantallaCategorias from './components/abmCategorias/PantallaCategorias';
import PantallaCupones from './components/abmCupones/PantallaCupones';


function App() {
  return (
    <CategoriasProvider>
      <div>
        <Router>
          <Switch>

            <Route exact path={rutaAdminLogin} component={Login} />
            <Route exact path={rutaAdminLogout} component={Logout} />
            <Route exact path={'/'} component={() => <Redirect to={rutaAdminAlbumes} />} />

            <Route exact path={rutaAdminAlbumes} component={() => <RequireAuth Component={AdminAlbumes} />} />
            <Route exact path={rutaAdminCrearAlbum} component={() => <RequireAuth Component={AdminCrearAlbum} />} />
            <Route exact path={rutaAdminPedidos} component={() => <RequireAuth Component={AdminPedidos} />} />
            <Route exact path={rutaAdminEventos} component={() => <RequireAuth Component={AdminEventos} />} />
            <Route exact path={rutaAdminPrecios} component={() => <RequireAuth Component={AdminConfig} />} />
            <Route exact path={rutaAdminModificarAlbum} component={() => <RequireAuth Component={AdminModificarAlbum} />} />
            <Route exact path={rutaAdminSubirFotos} component={() => <RequireAuth Component={AdminSubidaFotos} />} />
            <Route exact path={rutaAdminTamaniosPrecios} component={() => <RequireAuth Component={PantallaTamaniosPrecios} />} />
            <Route exact path={rutaAdminCategorias} component={() => <RequireAuth Component={PantallaCategorias} />} />
            <Route exact path={rutaAdminCupones} component={() => <RequireAuth Component={PantallaCupones} />} />


          </Switch>
        </Router>

      </div>
    </CategoriasProvider>
  );
}

export default App;