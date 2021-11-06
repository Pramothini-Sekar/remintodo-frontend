import * as React from 'react';

import './SignUp.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { withRouter } from 'react-router-dom';
import env from '../env';

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
        const url = env + 'user?=' + this.state.contactDetails.number;

        fetch(url, { mode: 'cors' })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log('Success:', result);
                    console.log('List:', this.state.list);
                    this.setState({
                        ...this.state,
                        list: result
                    }, () => {
                        this.props.history.push('/emergency-motivator', { number: this.state.contactDetails.number });
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
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
