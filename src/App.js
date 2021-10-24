import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Login from "./components/auth/Login";
import Logout from './components/auth/Logout';
import RequireAuth from './components/auth/RequireAuth';
import {
  rutaAdminAlbumes,
  rutaAdminCategorias,
  rutaAdminCrearAlbum,
  rutaAdminCupones,
  rutaAdminLogin,
  rutaAdminLogout,
  rutaAdminModificarAlbum,
  rutaAdminPedidos,
  rutaAdminSubirFotos,
  rutaAdminTamaniosPrecios
} from './components/routes/RutasAdmin';


import ListadoAlbumes from './components/vistaAlbumes/ListadoAlbumes';


import { CategoriasProvider } from './context/CategoriasContext';

import AdminSubidaFotos from './components/fotografias/AdminSubidaFotos';
import PantallaTamaniosPrecios from './components/abmTamaniosPrecios/PantallaTamaniosPrecios';
import PantallaCategorias from './components/abmCategorias/PantallaCategorias';
import PantallaCupones from './components/abmCupones/PantallaCupones';
import CreateAlbum from './components/vistaAlbumes/CreateAlbum';
import EditAlbumData from './components/vistaAlbumes/EditAlbumData';
import PantallaPedidos from './components/pedidos/PantallaPedidos';


function App() {
  return (
    <CategoriasProvider>
      <div>
        <Router>
          <Switch>

            <Route exact path={rutaAdminLogin} component={Login} />
            <Route exact path={rutaAdminLogout} component={Logout} />
            <Route exact path={'/'} component={() => <Redirect to={rutaAdminAlbumes} />} />

            <Route exact path={rutaAdminAlbumes} component={() => <RequireAuth Component={ListadoAlbumes} />} />
            <Route exact path={rutaAdminCrearAlbum} component={() => <RequireAuth Component={CreateAlbum} />} />
            <Route exact path={rutaAdminPedidos} component={() => <RequireAuth Component={PantallaPedidos} />} />

            <Route exact path={rutaAdminModificarAlbum} component={() => <RequireAuth Component={EditAlbumData} />} />
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