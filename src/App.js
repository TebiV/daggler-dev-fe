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
  rutaAdminDeleteFotos,
  rutaAdminLogin,
  rutaAdminLogout,
  rutaAdminModificarAlbum,
  rutaAdminPedidos,
  rutaAdminSubirFotos,
  rutaAdminTamaniosPrecios
} from './components/routes/RutasAdmin';


import PantallaAlbumes from './components/abmAlbumes/PantallaAlbumes';

import Navbar from './components/layout/Navbar'
import { CategoriasProvider } from './context/CategoriasContext';

import AdminSubidaFotos from './components/fotografias/AdminSubidaFotos';
import PantallaTamaniosPrecios from './components/abmTamaniosPrecios/PantallaTamaniosPrecios';
import PantallaCategorias from './components/abmCategorias/PantallaCategorias';
import PantallaCupones from './components/abmCupones/PantallaCupones';
import CreateAlbum from './components/abmAlbumes/CreateAlbum';
import EditAlbumData from './components/abmAlbumes/EditAlbumData';
import PantallaPedidos from './components/pedidos/PantallaPedidos';
import { useSelector } from 'react-redux';
import DeleteAlbumPhotos from './components/abmAlbumes/deleteAlbumPhotos/DeleteAlbumPhotos';


function App() {
  const token = useSelector(state => state.tokenReducer);
  return (
    <CategoriasProvider>
      <div>
        <Router>
        {token.length > 0 ? <Navbar/> : null}

          <Switch>

            <Route exact path={rutaAdminLogin} component={Login} />
            <Route exact path={rutaAdminLogout} component={Logout} />
            <Route exact path={'/'} component={() => <Redirect to={rutaAdminAlbumes} />} />

            <Route exact path={rutaAdminAlbumes} component={() => <RequireAuth Component={PantallaAlbumes} />} />
            <Route exact path={rutaAdminCrearAlbum} component={() => <RequireAuth Component={CreateAlbum} />} />
            <Route exact path={rutaAdminPedidos} component={() => <RequireAuth Component={PantallaPedidos} />} />

            <Route exact path={rutaAdminModificarAlbum} component={() => <RequireAuth Component={EditAlbumData} />} />
            <Route exact path={rutaAdminSubirFotos} component={() => <RequireAuth Component={AdminSubidaFotos} />} />
            <Route exact path={rutaAdminTamaniosPrecios} component={() => <RequireAuth Component={PantallaTamaniosPrecios} />} />
            <Route exact path={rutaAdminCategorias} component={() => <RequireAuth Component={PantallaCategorias} />} />
            <Route exact path={rutaAdminCupones} component={() => <RequireAuth Component={PantallaCupones} />} />
            <Route exact path={rutaAdminDeleteFotos} component={() => <RequireAuth Component={DeleteAlbumPhotos} />} />


          </Switch>
        </Router>

      </div>
    </CategoriasProvider>
  );
}

export default App;