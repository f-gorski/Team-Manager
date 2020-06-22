import React, { Component } from 'react';

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
        .then(data => {this.setState({
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
        .then(() =>  this.handleListUpdate());
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
        return(
            <div className="container">
                <div className="box">
                    <h2>Grupy sportowe</h2>
                    {this.state.groups ? <GroupsList groups={this.state.groups} handleClick={this.handleClick} handleDelete={this.handleDelete}/> : null}
                    <AddGroup handleListUpdate={this.handleListUpdate} />
                </div>
                {this.state.groupDetails 
                    ? 
                    <div className="box"> 
                        <GroupDetails groupDetails={this.state.groupDetails} /> 
                    </div> 
                    : 
                    null
                }
            </div>
        )
    }
}

export default Groups;