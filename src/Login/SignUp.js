import * as React from 'react';

import './SignUp.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { withRouter } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Steps } from 'intro.js-react';
import "intro.js/introjs.css";
import env from '../env';

class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            age: '',
            occupation: '',
            contactDetails: {
                number: '',
                email: ''
            },
            contactTime: '',
            list: [],
            validationCode: '000000'
        }

        this.setName = this.setName.bind(this);
        this.setAge = this.setAge.bind(this);
        this.setOccupation = this.setOccupation.bind(this);
        this.setContactNumber = this.setContactNumber.bind(this);
        this.setContactEmail = this.setContactEmail.bind(this);
        this.setContactTime = this.setContactTime.bind(this);
        this.addNewUser = this.addNewUser.bind(this);
    }

    addNewUser() {
        let newUser = {
            id: this.state.contactDetails.number,
            name: this.state.name,
            age: this.state.age,
            occupation: this.state.occupation,
            number: this.state.contactDetails.number,
            email: this.state.contactDetails.email,
            contactTime: this.state.contactTime
        };

        const url = env + 'add-user';

        fetch(url, {
            method: 'post',
            body: JSON.stringify(newUser),
            headers: {
                'Content-Type': 'application/json',
                'mode': 'cors'
            },
        }).then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                console.log('List:', this.state.list);
                this.setState({
                    ...this.state,
                    list: data,
                    validationCode: data.validationCode
                }, () => {
                    this.props.history.push('/code-validation', { validationCode: this.state.validationCode, number: this.state.contactDetails.number });
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            }, () => {
                this.props.history.push('/');
            });
    }

    setName(event) {
        this.setState({
            ...this.state,
            name: event.target.value
        })
    }

    setAge(event) {
        this.setState({
            ...this.state,
            age: event.target.value
        })
    }

    setOccupation(event) {
        this.setState({
            ...this.state,
            occupation: event.target.value
        })
    }

    setContactNumber(event) {
        this.setState({
            ...this.state,
            contactDetails: {
                ...this.state.contactDetails,
                number: event.target.value
            }
        })
    }

    setContactEmail(event) {
        this.setState({
            ...this.state,
            contactDetails: {
                ...this.state.contactDetails,
                email: event.target.value
            }
        })
    }

    setContactTime(event) {
        this.setState({
            ...this.state,
            contactTime: event.target.value
        })
    }

    render() {

        return (
            <div className="SignUp">
                <h2 style={{ color: '#1976D2' }}>Sign Up</h2>
                <div>
                    <div className="add-contact">
                        <div className="text-basic">
                            <TextField
                                id="name"
                                label="Name"
                                variant="outlined"
                                value={this.state.name || ''}
                                onChange={this.setName}
                            />
                        </div>
                        <div className="text-basic">
                            <TextField
                                id="age"
                                label="Age"
                                variant="outlined"
                                value={this.state.age || ''}
                                onChange={this.setAge}
                            />
                        </div>
                        <div className="text-basic">
                            <TextField
                                id="occupation"
                                label="Occupation"
                                variant="outlined"
                                value={this.state.occupation || ''}
                                onChange={this.setOccupation}
                            />
                        </div>
                        <div className="text-basic">
                            <TextField
                                id="number"
                                label="Contact Number"
                                variant="outlined"
                                value={this.state.contactDetails.number || ''}
                                onChange={this.setContactNumber}
                            />
                        </div>
                        <div className="text-basic">
                            <TextField
                                style={{ color: '#d9f0ff' }}
                                id="email"
                                label="Contact Email"
                                variant="outlined"
                                value={this.state.contactDetails.email || ''}
                                onChange={this.setContactEmail}
                            />
                        </div>

                        <div className="select-basic">
                            <FormControl sx={{ width: 200 }}>
                                <InputLabel id="select-basic">When to contact?</InputLabel>
                                <Select
                                    labelId="select-basic"
                                    id="select-basic"
                                    value={this.state.contactTime}
                                    label="When to contact?"
                                    onChange={this.setContactTime}
                                >
                                    <MenuItem value={10}>30 minutes before deadline</MenuItem>
                                    <MenuItem value={20}>1 hour before deadline</MenuItem>
                                    <MenuItem value={30}>Every hour starting 5 hours before the deadline</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <div className="add-user-button">
                        <Button sx={{ m: 1, minWidth: 200 }} onClick={this.addNewUser} variant="outlined">Sign Up</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(SignUp);
