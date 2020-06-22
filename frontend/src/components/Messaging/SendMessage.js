import React, { Component } from 'react';

class SendMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msgFrom: this.props.user,
            msgTo: "",
            msgHeader: "",
            msgBody: "",
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        fetch('http://localhost:5000/api/messages', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => console.log(response.status, "response:", response))
            .then(() =>  this.props.handleListUpdate());

        this.setState({
            msgFrom: this.props.user,
            msgTo: "",
            msgHeader: "",
            msgBody: "",
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <h3>Nowa wiadomość:</h3>
               
                <div>
                    <label>Adresat:
                        <input name="msgTo" type="text" value={this.state.msgTo} onChange={this.handleChange} />
                    </label>
                </div>

                <div>
                    <label>Temat:
                        <input name="msgHeader" type="text" value={this.state.msgHeader} onChange={this.handleChange} />
                    </label>
                </div>

                <div>
                    <label>Treść
                        <input name="msgBody" type="textarea" rows="4" cols="50" placeholder="Napisz wiadomość" value={this.state.msgBody} onChange={this.handleChange} />
                    </label>
                </div>

                <button type="submit">Wyślij wiadomość</button>
            </form>
        )       
    }
}

export default SendMessage;