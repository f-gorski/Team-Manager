import React, { Component } from 'react';
import { AuthContext } from '../../auth/AuthContext';

import AuthNav from './AuthNav';
import MainNav from './MainNav';


class Nav extends Component {
    render() {
        return (
            <header>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container">
                        <a className="navbar-brand" href="#">Zarządzanie drużynami</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarText">
                            <ul className="navbar-nav mr-auto">
                                <AuthNav user={this.context.user} />
                            </ul>
                            <ul className="navbar-nav ml-auto">
                                <MainNav user={this.context.user} />
                            </ul>

                        </div>
                    </div>
                </nav>
            </header>
        )
    }
}

Nav.contextType = AuthContext;


export default Nav;
