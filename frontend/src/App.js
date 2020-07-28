import React, { Component } from 'react';
import {
  Switch,
  Route,
  BrowserRouter
} from 'react-router-dom';
import './App.css';

import { AuthContext } from './auth/AuthContext';

import Nav from './components/Navigation/Nav';
import Groups from './components/Groups/Groups';
import Messaging from './components/Messaging/Messaging';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import LogIn from './components/LogIn/LogIn';
import LogOut from './components/LogOut/LogOut';
import CalendarOptions from './components/Calendar/CalendarOptions';

class App extends Component {

  constructor() {
    super();
    this.state = {
      user: null
    }
  }

  setUser = (newUser) => {
    this.setState({
      user: newUser
    })
  }
  
  render() {
    return (
      <div className="App">
        <AuthContext.Provider value={{user: this.state.user, setUser: this.setUser}}>
          <BrowserRouter>
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
              <Route path="/kalendarz">
                <CalendarOptions />
              </Route>
              <Route path="/rejestracja">
                <Register />
              </Route>
              <Route path="/logowanie">
                <LogIn />
              </Route>
              <Route path="/wylogowanie">
                <LogOut />
              </Route>
            </Switch>
          </BrowserRouter>
        </AuthContext.Provider>
      </div>
    )
  }
}

export default App;
