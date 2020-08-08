import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class MainNav extends Component {
    render() {
        return (
            <>
                <li className="nav-item"><NavLink className="nav-link" activeClassName="active-link" exact to='/'>Strona główna</NavLink></li>
                {
                    this.props.user
                        ?
                        <>
                            <li className="nav-item"><NavLink className="nav-link" activeClassName="active-link" to='/grupy'>Grupy</NavLink></li>
                            <li className="nav-item"><NavLink className="nav-link" activeClassName="active-link" to='wiadomosci'>Wiadomosci</NavLink></li>
                            <li className="nav-item"><NavLink className="nav-link" activeClassName="active-link" to='kalendarz'>Kalendarz</NavLink></li>
                        </>
                        :
                        null
                }
            </>
        )
    }
}

export default MainNav;
