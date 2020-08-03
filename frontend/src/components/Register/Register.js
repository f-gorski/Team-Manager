import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            passwordOne: "",
            passwordTwo: "",
            nameError: "",
            emailError: "",
            matchingError: "",
            passwordError: ""
        }
    }

    validate = () => {
        let nameError = "";
        let emailError = "";
        let passwordError = "";
        let matchingError = "";

        const regexName = /^[a-zA-Z ]+$/;
        if(!regexName.test(this.state.name) || !this.state.name.length) {
            nameError = "Podaj prawidłowe imię i nazwisko";
        }
        
        if(this.state.passwordOne !== this.state.passwordTwo) {
            matchingError = "Hasła muszą się zgadzać";
        } 
        if(this.state.passwordOne.length < 3) {
            passwordError = "Hasło musi miec minimum 3 znaki"
        }

        const regexEmail = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if(!regexEmail.test(this.state.email) || !this.state.email.length) {
            console.log(this.state.email.length)
            emailError = "Nieprawidłowy email";
        }

        if(emailError || passwordError || matchingError) {
            this.setState({nameError, emailError, matchingError, passwordError});
            return false;
        }

        this.setState({
            name: "",
            email: "",
            passwordOne: "",
            passwordTwo: "",
            nameError: "",
            emailError: "",
            matchingError: "",
            passwordError: ""
        })

        return true;
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const isFormValid = this.validate();

        if(isFormValid) {
            const postBody = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.passwordOne,
            }
    
            fetch('http://localhost:5000/signup', {
                    method: 'POST',
                    body: JSON.stringify(postBody),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => response.json())
                .then((userData) => {
                    this.context.setUser(userData.user);
                    console.log("Zalogowany user:", this.context.user)
                    this.props.history.push('/')
                });
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
                    <h3>Rejestracja:</h3>
                    <form onSubmit={this.handleSubmit}>

                        <div className="form-group">
                            <label>Imię i nazwisko:
                                <input className="form-control" name="name" type="text" value={this.state.name} onChange={this.handleChange} />
                            </label>
                            {this.state.nameError ? (
                                <div className="alert alert-warning">
                                    {this.state.nameError}
                                </div> 
                            ) : null
                            }
                        </div>
                        
                
                        <div className="form-group">
                            <label>Email:
                                <input className="form-control" name="email" type="text" value={this.state.email} onChange={this.handleChange} />
                            </label>
                            {this.state.emailError ? (
                                <div className="alert alert-warning">
                                    {this.state.emailError}
                                </div> 
                            ) : null
                            }
                        </div>

                        <div className="form-group">
                            <label>Hasło:
                                <input className="form-control" name="passwordOne" type="password" value={this.state.passwordOne} onChange={this.handleChange} />
                            </label>
                            {this.state.passwordError ? (
                                <div className="alert alert-warning">
                                    {this.state.passwordError}
                                </div> 
                            ) : null
                            }
                        </div>

                        <div className="form-group">
                            <label>Powtórz hasło:
                                <input className="form-control" name="passwordTwo" type="password" value={this.state.passwordTwo} onChange={this.handleChange} />
                            </label>
                            {this.state.matchingError ? (
                                <div className="alert alert-warning">
                                    {this.state.matchingError}
                                </div> 
                            ) : null
                            }
                        </div>

                        <button type="submit" className="btn btn-dark">Zarejestruj</button>
                    </form>
                </div>
            </div>
            </>
        )       
    }
}

Register.contextType = AuthContext;

export default withRouter(Register);