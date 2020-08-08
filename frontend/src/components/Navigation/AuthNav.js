import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class AuthNav extends Component {
    render() {
        return (
            <>
                {
                    this.props.user
                        ?
                        <span className="navbar-text">{`Witaj ${this.props.user.name}`}</span>
                        :
                        <li className="nav-item"><NavLink className="nav-link" activeClassName="active-link" to='/logowanie'>Zaloguj się</NavLink></li>
                }
                {
                    this.props.user
                        ?
                        <li className="nav-item"><NavLink className="nav-link" activeClassName="active-link" to='/wylogowanie'>Wyloguj się</NavLink></li>
                        :
                        <li className="nav-item"><NavLink className="nav-link" activeClassName="active-link" to='/rejestracja'>Rejestracja</NavLink></li>
                }
            </>
        )
    }
}


export default AuthNav;

