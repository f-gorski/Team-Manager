import React, { Component } from 'react';

import MsgDetails from './MsgDetails';
import SendMessage from './SendMessage';
import { AuthContext } from '../../auth/AuthContext';

class Messaging extends Component {
    constructor() {
        super();
        this.state = {
            msgList: null,
            msgDetails: null
        }
    }

    componentDidMount() {
        console.log(this.context.user.email)
        fetch(`http://localhost:5000/api/messages/${this.context.user.user_id}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState({
                    msgList: { ...data }
                })
            })
    }

    handleListUpdate = () => {
        fetch(`http://localhost:5000/api/messages/${this.context.user.user_id}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    msgList: data
                })
            })
    }

    generateList(msgList) {
        const msgToRender = msgList.map((message) => {
            return <><li id={message.rowid} onClick={this.handleClick}>{message.header}</li><button id={message.rowid} onClick={this.handleDelete} className="btn btn-dark btn-sm">Usuń</button></>
        });

        return msgToRender;
    }

    handleClick = (e) => {
        console.log(e.target.id);
        fetch(`http://localhost:5000/api/messages/find/${e.target.id}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    msgDetails: data
                })
                console.log(this.state.msgDetails)
            });
    }

    handleDelete = (e) => {
        console.log(e.target.id);
        fetch('http://localhost:5000/api/messages/' + e.target.id, {
            method: 'DELETE'
        }
        )
            .then(response => console.log(response.status, "response:", response))
            .then(() => this.handleListUpdate());
    }

    render() {
        return (
            <>
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-xs-12 col-md-5 mt-4">
                            <h2>Odebrane wiadomości:</h2>
                            <ul className="items-list">
                                {this.state.msgList ? this.generateList(this.state.msgList.recieved) : null}
                            </ul>
                            <h2>Wysłane wiadomosci:</h2>
                            <ul className="items-list">
                                {this.state.msgList ? this.generateList(this.state.msgList.sent) : null}
                            </ul>

                            <div>
                                <SendMessage user={this.context.user} handleListUpdate={this.handleListUpdate} />
                            </div>
                        </div>

                        {this.state.msgDetails
                            ?
                            <div className='col-xs-12 col-md-5 mt-4'>
                                <MsgDetails msgDetails={this.state.msgDetails} />
                            </div>
                            :
                            null
                        }
                    </div>
                </div>
            </>
        )
    }
}

Messaging.contextType = AuthContext;

export default Messaging;