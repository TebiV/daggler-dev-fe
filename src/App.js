import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Admin from './components/admin/Admin';
import NewAlbumes from './components/albumes/NewAlbumes';
import Login from "./components/admin/login";
import Header from './components/Header';
import SubidaFotos from './components/albumes/SubidaFotos';
function App() {
  return (
    <div>
      <Router>
      <Header ruta="XV"></Header>
        <Switch>
          {/* //CADA UNA DE LAS DIFERENTES PAGINAS. */}
          {/* <Route exact path = '/' component {Home}/>
        <Route exact path = '/' component {Login}/>
        <Route exact path = '/albumes' component {Albumes}/>
        <Route exact path = '/fotografias' component {Albumes}/> */}
        <Route exact path="/admin" component={Admin}/>
        <Route exact path="/new-album" component={NewAlbumes}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/subir-fotos" component={SubidaFotos}/>
        <Route exact  component={Header} />
      </Switch>
    </Router>
    </div>
  );
}

export default App;
