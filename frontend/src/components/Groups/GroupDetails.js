import React, { Component } from 'react';

class GroupDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    render() {
        return (
                 <ul className="items-list">
                    <li>Nazwa grupy: {this.props.groupDetails.name}</li>
                    <li>Członkowie grupy: {this.props.groupDetails.member_list_id}</li>
                    <li>Trener grupy: {this.props.groupDetails.trainer_name}</li>
                </ul>
        )
    }
}


export default GroupDetails;