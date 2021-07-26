import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Admin from './components/admin/Admin';
import NewAlbumes from './components/albumes/NewAlbumes';
import Login from "./components/auth/Login";
import Header from './components/Header';
import SubidaFotos from './components/fotografias/SubidaFotos';
import FormDatosCliente from './components/compras/FormDatosCliente';
import Albumes from './components/albumes/Albumes';
import Logout from './components/auth/Logout';
import RequireAuth from './components/auth/RequireAuth';
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
        <Route exact path="/admin" component={() => <RequireAuth Component={Admin}/>}/>
        <Route exact path="/new-album" component={() => <RequireAuth Component={NewAlbumes}/>}/>
        <Route exact path="/admin/login" component={Login}/>
        <Route exact path="/admin/logout" component={Logout}/>

        <Route exact path="/subir-fotos" component={SubidaFotos}/>
        <Route exact path="/carrito-2" component={FormDatosCliente}/>
        <Route exact path = "/albumes" component={Albumes}/>
        <Route exact  component={Header} />
        
      </Switch>
    </Router>
    </div>
  );
}

export default App;
