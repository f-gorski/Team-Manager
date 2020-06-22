import React, { Component } from 'react';

class MsgDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    render() {
        return (
                 <ul className="items-list">
                    <li>Temat: {this.props.msgDetails.header}</li>
                    <li>Od: {this.props.msgDetails.msg_from}</li>
                    <li>Do: {this.props.msgDetails.msg_to}</li>
                    <li>Wiadomość: {this.props.msgDetails.body}</li>
                </ul>
        )
    }
}


export default MsgDetails;