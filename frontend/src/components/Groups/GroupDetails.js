import React, { Component } from 'react';

class GroupDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    render() {
        let membersToRender = null;

        if(this.props.groupDetails.members) {
            membersToRender = this.props.groupDetails.members.map((member, index) => {
                return <li key={index}>{member}</li>
             })
        }

        return (
                 <ul className="items-list">
                    <li>Nazwa grupy: {this.props.groupDetails.group_name}</li>
                    <li>Członkowie grupy: <ul>{membersToRender}</ul></li>
                    <li>Trener grupy: {this.props.groupDetails.trainer}</li>
                </ul>
        )
    }
}


export default GroupDetails;