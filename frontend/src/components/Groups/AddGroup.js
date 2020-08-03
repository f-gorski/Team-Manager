import React, { Component } from 'react';
import TrainerSelect from './TrainerSelect';

class AddGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trainerList: null,
            nameGroup: "",
            trainer: "",
            nameError: "",
            trainerError: ""
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

    validate = () => {
        let nameError = "";
        let trainerError = "";

        const regexName = /^[a-zA-Z ]+$/;
        if(!regexName.test(this.state.nameGroup)) {
            nameError = "Podaj nazwę grupy"
        }

        if(!this.state.trainer) {
            trainerError = "Wybierz trenera grupy";
        }

        if(nameError || trainerError) {
            this.setState({nameError, trainerError});
            return false;
        }

        this.setState({
            nameError: "",
            trainerError: ""
        })

        return true;
    }


    handleSubmit = (e) => {
        e.preventDefault();
        const isFormValid = this.validate();

        if(isFormValid) {
            const postBody = {
                nameGroup: this.state.nameGroup,
                trainer: this.state.trainer
            }
            const trainerList = this.state.trainerList;

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
               
                <div className="form-group">
                    <label>Nazwa grupy
                        <input name="nameGroup" type="text" value={this.state.nameGroup} onChange={this.handleChange} className="form-control" />
                    </label>
                </div>

                <div className="form-group">
                <label>Trener
                        {this.state.trainerList
                            ?
                            <TrainerSelect trainerList={this.state.trainerList} trainer={this.state.trainer} handleChange={this.handleChange}/>
                            :
                            null
                        }
                    </label>
                </div>

                <button type="submit" className="btn btn-dark">Dodaj grupę</button>
                    {this.state.nameError ?
                        <div className="alert alert-warning">{this.state.nameError}</div>
                        :null}
                    {this.state.trainerError ?
                        <div className="alert alert-warning">{this.state.trainerError}</div>
                        :null}
            </form>
        )       
    }
}

export default AddGroup;