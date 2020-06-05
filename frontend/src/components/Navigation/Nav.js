import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Nav extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <header className="App-header">
                <div className="container">
                    <h1>Zarządzanie drużynami</h1>
                    <nav className="nav">
                        <ul>
                            <NavLink activeClassName="active-link" exact to='/'>Strona główna</NavLink>
                            <NavLink activeClassName="active-link" to='/grupy'>Grupy</NavLink>
                            <NavLink activeClassName="active-link" to='/wiadomosci'>Wiadomosci</NavLink>
                        </ul>
                    </nav>
                </div>
            </header>
        )
    }
        
}

export default Nav;

