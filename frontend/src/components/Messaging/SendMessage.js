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
        }
    }

    componentDidMount() {
        fetch(`http://localhost:5000/api/users/${this.props.user.user_id}`)
            .then(response => response.json())
            .then((data) =>  this.setState({userList: data}));
        
        console.log(this.state.userList);  
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const postBody = this.state;
        delete postBody.userList;

        console.log(this.state.msgFrom)
        console.log(this.state);
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
            msgFrom: this.props.user.user_id,
            msgTo: "",
            msgHeader: "",
            msgBody: "",
        })
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
               
                <div>
                    <label>Adresat:
                        {this.state.userList
                            ?
                            <UserSelect userList={this.state.userList} msgTo={this.state.msgTo} handleChange={this.handleChange}/>
                            :
                            null
                        }

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