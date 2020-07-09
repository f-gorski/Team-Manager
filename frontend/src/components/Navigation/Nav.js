import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';



class Nav extends Component {
    render() {
        return (
            <header className="App-header">
                <div className="container">
                    <h1>Zarządzanie drużynami</h1>
                    <AuthNav user={this.context.user}/>
                    <MainNav user={this.context.user}/>
                </div>
            </header>
        )
    } 
}

Nav.contextType = AuthContext;

class MainNav extends Component {
    render() {
        return (
                    <nav className="nav">
                        <ul>
                            <>
                            <NavLink activeClassName="active-link" exact to='/'>Strona główna</NavLink>
                            {
                                this.props.user 
                                ? 
                                <>
                                <NavLink activeClassName="active-link" to='/grupy'>Grupy</NavLink>
                                <NavLink activeClassName="active-link" to='wiadomosci'>Wiadomosci</NavLink>
                                </>
                                :
                                null
                            }
                            </>
                        </ul>
                    </nav>
        )
    } 
}

class AuthNav extends Component {
    render() {
        return (
                    <nav className="nav">
                        <ul>
                            <>
                            {
                                this.props.user 
                                ?
                                <span>{`Witaj ${this.props.user.name}`}</span>
                                :
                                <NavLink activeClassName="active-link" to='/logowanie'>Zaloguj się</NavLink>
                            }
                            {
                                this.props.user
                                ?
                                <NavLink activeClassName="active-link" to='/wylogowanie'>Wyloguj się</NavLink>
                                :
                                <NavLink activeClassName="active-link" to='/rejestracja'>Rejestracja</NavLink>
                            }
                            </>
                        </ul>
                    </nav>
        )
    } 
}


export default Nav;

