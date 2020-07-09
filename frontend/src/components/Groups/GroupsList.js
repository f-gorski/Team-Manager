import React, { Component } from 'react';

class GroupsList extends Component {
    constructor() {
        super();
        this.state = {
            
        }
    }

    render() {
            const groupsToRender = this.props.groups.map((group) => {
            return( 
                <>
                <li onClick={this.props.handleClick} id={group.rowid}>{group.group_name}</li>
                {this.props.user.role == "admin"
                ?
                <button id={group.rowid} onClick={this.props.handleDelete}>Usuń</button>
                :
                null
                }

                {this.props.user.role == "user"
                ?
                <button id={group.rowid} onClick={this.props.handleJoinGroup}>Dołącz</button>
                :
                null
                }
                
                </>
            )
            })
            
        return(
            <ul className="items-list">
                {groupsToRender}
            </ul>
        )
    }
}

export default GroupsList;



