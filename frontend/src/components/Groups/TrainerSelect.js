import React, { Component } from 'react';

class TrainerSelect extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    render() {
        const optionsToRender = this.props.trainerList.map((user, index) => {
            return <option value={user.user_id}>{user.name}</option>
        });
        return (
                 <select name="trainer" value={this.props.trainer} onChange={this.props.handleChange} className="form-control">
                     <option value="">Imię i nazwisko trenera</option>
                     {optionsToRender}
                 </select>
        )
    }
}


export default TrainerSelect;