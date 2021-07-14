import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from '/component/dondesea'

function App() {
  return (
    <Router>
      //ACA VA LO QUE SE VE EN TODAS LAS PAGINAS
      <Switch>
        //CADA UNA DE LAS DIFERENTES PAGINAS.
        <Route exact path = '/' component {Home}/>
        <Route exact path = '/' component {Login}/>
        <Route exact path = '/albumes' component {Albumes}/>
        <Route exact path = '/fotografias' component {Albumes}/>
        <Route exact path = '/admin' component {Admin}/>
        //ETC ETC, ESTO HAY QUE DEFINIRLO BIEN CREO
      </Switch>
    </Router>
  );
}

export default App;
