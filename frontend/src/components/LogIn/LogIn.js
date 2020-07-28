import React, { Component } from 'react';
import { AuthContext } from '../../auth/AuthContext';
import { withRouter } from 'react-router-dom';

class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log("test", this.context.user)
        
        fetch('http://localhost:5000/login', {
                method: 'POST',
                body: JSON.stringify(this.state),
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
                    
                        <div>
                            <label>Email:
                                <input name="email" type="text" value={this.state.email} onChange={this.handleChange} />
                            </label>
                        </div>

                        <div>
                            <label>Hasło:
                                <input name="password" type="password" value={this.state.password} onChange={this.handleChange} />
                            </label>
                        </div>

                        <button type="submit" className="btn btn-dark">Zaloguj się</button>
                    </form>
                </div>
            </div>
            </>
        )       
    }
}

LogIn.contextType = AuthContext;

export default withRouter(LogIn);