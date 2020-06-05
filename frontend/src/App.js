import React from 'react';
import {
  HashRouter,
  Link,
  Switch,
  Route,
  withRouter
} from 'react-router-dom';
import './App.css';

import Nav from './components/Navigation/Nav';
import Groups from './components/Groups/Groups';
import Messaging from './components/Messaging/Messaging';
import Home from './components/Home/Home';

function App() {
  return (
    <div className="App">
          <HashRouter>
          <Nav/>

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>

            <Route path="/grupy">
              <Groups />
            </Route>
            <Route path="/wiadomosci">
              <Messaging />
            </Route>
            {/* <Route path="/rejestracja">
              <Register />
            </Route>
            <Route path="/logowanie">
              <LogIn />
            </Route>
            <Route path="/wylogowanie">
              <LogOut />
            </Route> */}
          </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
