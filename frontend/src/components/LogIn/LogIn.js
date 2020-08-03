import React, { Component } from 'react';
import { AuthContext } from '../../auth/AuthContext';
import { withRouter } from 'react-router-dom';

class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            loginError: "",
            authError: ""
        }
    }

    validate = () => {
        let loginError = "";

        if(!this.state.email.length || !this.state.password.length) {
            loginError = "Podaj email i hasło";
        }

        if(loginError) {
            this.setState({loginError});
            return false;
        }
        
        this.setState({
            email: "",
            password: "",
            loginError: "",
            authError: ""
        })

        return true;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        
        const isFormValid = this.validate();
       
        if(isFormValid) {
            fetch('http://localhost:5000/login', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if(response.status == "401") {
                    this.setState({
                        authError: "Nieprawidłowy email lub hasło"
                    })
                }
                return response.json()
            })
            .then((userData) => {
                this.context.setUser(userData.user);
                this.props.history.push('/')
            })
            .catch(error => console.log(error));
        }
        
    }

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        })
    }

    render() {
        return(
            <>
            <div className="container">
                <div className="box">
                    <form onSubmit={this.handleSubmit}>
                        <h3>Logowanie:</h3>
                    
                        <div className="form-group">
                            <label>Email:
                                <input className="form-control" name="email" type="text" value={this.state.email} onChange={this.handleChange} />
                            </label>
                        </div>

                        <div className="form-group">
                            <label>Hasło:
                                <input name="password" type="password" value={this.state.password} onChange={this.handleChange} className="form-control"/>
                            </label>
                        </div>

                        <button type="submit" className="btn btn-dark">Zaloguj się</button>
                        {this.state.loginError
                        ?
                        <div className="alert alert-warning">{this.state.loginError}</div>
                        :
                        null}
                        {this.state.authError
                        ?
                        <div className="alert alert-warning">{this.state.authError}</div>
                        :
                        null}
                    </form>
                </div>
            </div>
            </>
        )       
    }
}

LogIn.contextType = AuthContext;

export default withRouter(LogIn);