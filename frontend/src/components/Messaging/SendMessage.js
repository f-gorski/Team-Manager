import React, { Component } from 'react';
import UserSelect from './UserSelect';

class SendMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userList: null,
            msgFrom: this.props.user.user_id,
            msgTo: "",
            msgHeader: "",
            msgBody: "",
            msgToError: "",
            msgHeaderError: "",
            msgBodyError: ""
        }
    }

    componentDidMount() {
        fetch(`http://localhost:5000/api/users/${this.props.user.user_id}`)
            .then(response => response.json())
            .then((data) =>  this.setState({userList: data}));
        
        console.log(this.state.userList);  
    }

    validate = () => {
        let msgToError = "";
        let msgHeaderError = "";

        if(!this.state.msgTo) {
            msgToError = "Wybierz adresata";
        }

        const regexHeader = /^[a-zA-Z ]+$/;
        if(!regexHeader.test(this.state.msgHeader)) {
           msgHeaderError = "Wpisz temat wiadomości"
        }

        if(msgToError || msgHeaderError) {
            this.setState({msgToError, msgHeaderError});
            return false;
        }

        this.setState({
            msgToError: "",
            msgHeaderError: "",
            msgBodyError: ""
        })

        return true;
    }


    handleSubmit = (e) => {
        e.preventDefault();

        const isFormValid = this.validate();

        if(isFormValid) {
            const postBody = {
                msgFrom: this.state.msgFrom,
                msgTo: this.state.msgTo,
                msgHeader: this.state.msgHeader,
                msgBody: this.state.msgBody
            }
    
            fetch('http://localhost:5000/api/messages', {
                    method: 'POST',
                    body: JSON.stringify(postBody),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => console.log(response.status, "response:", response))
                .then(() =>  this.props.handleListUpdate());
    
            this.setState({
                msgTo: "",
                msgHeader: "",
                msgBody: "",
            })
        }
    }

    handleChange = (e) => {
        const {name, value} = e.target;
        console.log(name, value)
        this.setState({
            [name]: value
        })
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <h3>Nowa wiadomość:</h3>
               
                <div className="form-group">
                    <label>Adresat:
                        {this.state.userList
                            ?
                            <UserSelect userList={this.state.userList} msgTo={this.state.msgTo} handleChange={this.handleChange}/>
                            :
                            null
                        }

                    </label>
                </div>

                <div className="form-group">
                    <label>Temat:
                        <input name="msgHeader" type="text" value={this.state.msgHeader} onChange={this.handleChange} className="form-control"/>
                    </label>
                </div>

                <div className="form-group">
                    <label>Treść
                        <input name="msgBody" type="textarea" rows="4" cols="50" placeholder="Napisz wiadomość" value={this.state.msgBody} onChange={this.handleChange} className="form-control"/>
                    </label>
                </div>

                <button type="submit" className="btn btn-dark">Wyślij wiadomość</button>

                {this.state.msgToError ?
                    <div className="alert alert-warning">{this.state.msgToError}</div>
                    :null}
                {this.state.msgHeaderError ?
                    <div className="alert alert-warning">{this.state.msgHeaderError}</div>
                    :null}

            </form>
        )       
    }
}

export default SendMessage;