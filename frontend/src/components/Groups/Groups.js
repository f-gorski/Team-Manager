import React, { Component } from 'react';

class Groups extends Component {
    constructor() {
        super();
        this.state = {
            groups: null
        }
    }

    componentDidMount() {
        fetch('http://localhost:5000/api/groups')
            .then(response => response.json())
            .then(data => this.setState({
                groups: data
            }));
    }

    render() {
        let groupsToRender = null;

        if(this.state.groups) {
            groupsToRender = this.state.groups.map((group) => {
                return <li>{group}</li>
            })
        }
        
        return(
            <div className="container">
                <h2>Zawartość zakładki Grupy</h2>
                <ul className="groups-list">
                    {this.state.groups ? groupsToRender : "Wczytywanie..."}
                </ul>
            </div>
        )
    }
}

export default Groups;