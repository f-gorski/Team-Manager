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
            return <><li onClick={this.props.handleClick} id={group.rowid}>{group.name}</li><button id={group.rowid} onClick={this.props.handleDelete}>Usuń</button></>
            })
            
        return(
            <ul className="items-list">
                {groupsToRender}
            </ul>
        )
    }
}

export default GroupsList;



