import React, { Component } from 'react';
import { AuthContext } from '../../auth/AuthContext';
import { withRouter } from 'react-router-dom';

class LogOut extends Component {

    handleClick = (e) => {
        e.preventDefault();

        fetch('http://localhost:5000/logout')
            .then(response => {
                if (response.status === 200) {
                    this.context.setUser(null);
                    this.props.history.push('/logowanie')
                } else {
                    console.error(response.status)
                }
            })
    }

    render() {
        return (
            <>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xs-12 col-md-4 d-flex justify-content-center mt-4">
                            <button onClick={this.handleClick} className="btn btn-dark mx-auto">Wyloguj się</button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

LogOut.contextType = AuthContext;

export default withRouter(LogOut);