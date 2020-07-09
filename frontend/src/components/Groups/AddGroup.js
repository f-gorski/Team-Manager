import React, { Component } from 'react';
import TrainerSelect from './TrainerSelect';

class AddGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trainerList: null,
            nameGroup: "",
            trainer: "",
        }
    }

    componentDidMount() {
        fetch('http://localhost:5000/api/users/trainers')
            .then(response => response.json())
            .then((data) =>  {
                this.setState({trainerList: data});
                console.log(this.state.trainerList);
            }); 
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const postBody = this.state;
        const trainerList = this.state.trainerList;
        delete postBody.trainerList;

        fetch('http://localhost:5000/api/groups', {
                method: 'POST',
                body: JSON.stringify(postBody),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => console.log(response.status, "response:", response))
            .then(() =>  this.props.handleListUpdate());

        this.setState({
            nameGroup: "",
            trainer: "",
            trainerList: trainerList
        })
    }

    handleChange = (e) => {
        const {name, value} = e.target
        this.setState({
            [name]: value
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
                <label>Trener:
                        {this.state.trainerList
                            ?
                            <TrainerSelect trainerList={this.state.trainerList} trainer={this.state.trainer} handleChange={this.handleChange}/>
                            :
                            null
                        }
                    </label>
                </div>

                <button type="submit">Dodaj grupę</button>
            </form>
        )       
    }
}

export default AddGroup;