import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Admin from './components/admin/Admin';
import NewAlbumes from './components/albumes/NewAlbumes';

function App() {
  return (
    <Router>
     
      <Switch>
        {/* //CADA UNA DE LAS DIFERENTES PAGINAS. */}
        {/* <Route exact path = '/' component {Home}/>
        <Route exact path = '/' component {Login}/>
        <Route exact path = '/albumes' component {Albumes}/>
        <Route exact path = '/fotografias' component {Albumes}/> */}
        <Route exact path="/admin" component={Admin}/>
        <Route exact path="/new-album" component={NewAlbumes}/>
        
      </Switch>
    </Router>
  );
}

export default App;
