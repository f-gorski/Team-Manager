import React, { Component } from 'react';

class GroupsList extends Component {
    constructor() {
        super();
        this.state = {
            groupDetails: null
        }
    }

    render() {
            const groupsToRender = this.props.groups.map((group) => {
            return <li onClick={this.props.handleClick} id={group.group_id}>{group.name}</li>
            })
            
        return(
            <ul className="groups-list">
                {groupsToRender}
            </ul>
        )
    }
}

export default GroupsList;



