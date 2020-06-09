import React, { Component } from 'react';

class AddGroup extends Component {
    constructor() {
        super();
        this.state = {
            group_id: "323",
            nameGroup: "",
            membersList: "0",
            nameTrainer: "",
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        fetch('http://localhost:5000/api/groups', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => console.log(response.status, "response:", response))
            .then(() =>  this.props.handleListUpdate());

        this.setState({
            group_id: "323",
            nameGroup: "",
            membersList: "0",
            nameTrainer: "",
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <h3>Dodaj grupę</h3>
               
                <div>
                    <label>Nazwa grupy
                        <input name="nameGroup" type="text" value={this.state.nameGroup} onChange={this.handleChange} />
                    </label>
                </div>

                <div>
                    <label>Imię i nazwisko trenera
                        <input name="nameTrainer" type="text" value={this.state.nameTrainer} onChange={this.handleChange} />
                    </label>
                </div>

                <button type="submit">Dodaj grupę</button>
            </form>
        )       
    }
}

export default AddGroup;