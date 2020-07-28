import React, { Component } from 'react';
import { AuthContext } from '../../auth/AuthContext';
import { withRouter } from 'react-router-dom';

class LogOut extends Component {

    handleClick = (e) => {
        e.preventDefault();

        fetch('http://localhost:5000/logout')
            .then(response => {
                if(response.status === 200) {
                    this.context.setUser(null);
                    this.props.history.push('/logowanie')
                } else {
                    console.error(response.status)
                }
            })
    }

    render() {
        return(
            <>
            <div className="container">
                <div className="box">
                    <button onClick={this.handleClick} className="btn btn-dark">Wyloguj się</button>
                </div>
            </div>
            </>
        )       
    }
}

LogOut.contextType = AuthContext;

export default withRouter(LogOut);