import React, { Component } from 'react';

import { AuthContext } from '../../auth/AuthContext';

import GroupsList from './GroupsList';
import GroupDetails from './GroupDetails';
import AddGroup from './AddGroup';

class Groups extends Component {
    constructor() {
        super();
        this.state = {
            groups: null,
            groupDetails: null,
        }
    }

    componentDidMount() {
        fetch('http://localhost:5000/api/groups')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    groups: data
                })
                console.log(data);
            })
    }

    handleClick = (e) => {
        console.log(e.target.id);
        fetch(`http://localhost:5000/api/groups/${e.target.id}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    groupDetails: data
                })
                console.log(data)
            });
    }

    handleDelete = (e) => {
        console.log(e.target.id);
        fetch('http://localhost:5000/api/groups/' + e.target.id, {
            method: 'DELETE'
        }
        )
            .then(response => console.log(response.status, "response:", response))
            .then(() => this.handleListUpdate());
    }

    handleJoinGroup = (e) => {
        console.log(e.target.id);
        console.log(this.context.user.user_id)
        const userid = this.context.user.user_id;
        const groupid = e.target.id;

        fetch('http://localhost:5000/api/users/' + userid, {
            method: 'PATCH',
            body: JSON.stringify({
                groupid: groupid
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        )
            .then(response => console.log(response.status, "response:", response))
            .then(() => this.handleListUpdate());
    }

    handleListUpdate = () => {
        fetch('http://localhost:5000/api/groups')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    groups: data
                })
                console.log(data);
            })
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-between">
                    <div className="col-xs-12 col-md-5 mt-4">
                        <h2>Grupy sportowe</h2>
                        {this.state.groups
                            ?
                            <GroupsList groups={this.state.groups} handleClick={this.handleClick} handleDelete={this.handleDelete} handleJoinGroup={this.handleJoinGroup} user={this.context.user} />
                            :
                            null
                        }

                        {this.context.user.role == "admin"
                            ?
                            <AddGroup handleListUpdate={this.handleListUpdate} />
                            :
                            null
                        }
                    </div>

                    {this.state.groupDetails
                        ?
                            <div className="col-xs-12 col-md-5 mt-4">
                                <GroupDetails groupDetails={this.state.groupDetails} />
                            </div>
                        :
                        null
                    }
                </div>
            </div>
        )
    }
}

Groups.contextType = AuthContext;

export default Groups;