import * as React from 'react';

import './SignUp.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { withRouter } from 'react-router-dom';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            contactDetails: {
                number: '',
            },
            list: []
        }

        this.setContactNumber = this.setContactNumber.bind(this);
        this.signup = this.signup.bind(this);
        this.login = this.login.bind(this);
    }

    signup() {
        this.props.history.push('/signup');
    }

    login() {
        let newUser = {
            id: this.state.contactDetails.number,
            name: this.state.name,
            age: this.state.age,
            occupation: this.state.occupation,
            number: this.state.contactDetails.number,
            email: this.state.contactDetails.email,
            contactTime: this.state.contactTime
        };

        const url = 'https://remintodo-server.herokuapp.com/user/' + this.state.contactDetails.number;
        // const url = 'http://0.0.0.0:5000/user/' + this.state.contactDetails.number ;

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
                    list: data
                }, () => {
                    this.props.history.push('/emergency-motivator', { number: this.state.contactDetails.number });
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            }, () => {
                this.props.history.push('/');
            });
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

    render() {

        return (
            <div className="Login">
                <h2 style={{ color: '#1976D2' }}>Login</h2>
                <div>
                    <div className="user-contact">
                        <div className="text-basic">
                            <TextField
                                id="number"
                                label="Contact Number"
                                variant="outlined"
                                value={this.state.contactDetails.number || ''}
                                onChange={this.setContactNumber}
                            />
                        </div>
                    </div>
                    <div className="login-button">
                        <Button sx={{ m: 1, minWidth: 200 }} onClick={this.login} variant="outlined">Login</Button>
                    </div>
                    <h6 style={{ color: '#1976D2' }}>Don't have an account?</h6>
                    <div className="signup-button">
                        <Button sx={{ m: 1, minWidth: 200 }} onClick={this.signup} variant="outlined">Sign Up</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);
