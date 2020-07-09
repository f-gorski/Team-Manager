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
            passwordTwo: ""
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
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
            })
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

                        <div>
                            <label>Imię i nazwisko:
                                <input name="name" type="text" value={this.state.name} onChange={this.handleChange} />
                            </label>
                        </div>
                
                        <div>
                            <label>Email:
                                <input name="email" type="text" value={this.state.email} onChange={this.handleChange} />
                            </label>
                        </div>

                        <div>
                            <label>Hasło:
                                <input name="passwordOne" type="password" value={this.state.passwordOne} onChange={this.handleChange} />
                            </label>
                        </div>

                        <div>
                            <label>Powtórz hasło:
                                <input name="passwordTwo" type="password" value={this.state.passwordTwo} onChange={this.handleChange} />
                            </label>
                        </div>

                        <button type="submit">Zarejestruj</button>
                    </form>
                </div>
            </div>
            </>
        )       
    }
}

Register.contextType = AuthContext;

export default withRouter(Register);