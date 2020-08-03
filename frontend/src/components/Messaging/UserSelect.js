import React, { Component } from 'react';

class UserSelect extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const optionsToRender = this.props.userList.map((user, index) => {
            return <option value={user.user_id}>{user.name}</option>
        });
        return (
                 <select name="msgTo" value={this.props.msgTo} onChange={this.props.handleChange} className="form-control">
                     <option value="">Wybierz adresata</option>
                     {optionsToRender}
                 </select>
        )
    }
}


export default UserSelect;