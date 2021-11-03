import * as React from 'react';

import './EmergencyMotivator.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { withRouter } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import BottomNavigator from './BottomNavigator';
import { v4 as uuidv4 } from 'uuid';

class EmergencyMotivator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            relationship: '',
            contactDetails: {
                number: '',
                email: ''
            },
            contactTime: '',
            list: []
        }

        this.setName = this.setName.bind(this);
        this.setRelationship = this.setRelationship.bind(this);
        this.setContactNumber = this.setContactNumber.bind(this);
        this.setContactEmail = this.setContactEmail.bind(this);
        this.setContactTime = this.setContactTime.bind(this);
        this.addNewMotivator = this.addNewMotivator.bind(this);
        this.deleteMotivator = this.deleteMotivator.bind(this);
    }

    componentDidMount() {
        fetch("http://0.0.0.0:8080/list-motivator", { mode: 'cors' })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        ...this.state,
                        isLoaded: true,
                        list: result,
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        ...this.state,
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    addNewMotivator() {
        let newMotivator = {
            id: uuidv4().toString(),
            name: this.state.name,
            relationship: this.state.relationship,
            number: this.state.contactDetails.number,
            email: this.state.contactDetails.email,
            contactTime: this.state.contactTime
        };
        fetch('http://0.0.0.0:8080/add-motivator', {
            method: 'post',
            body: JSON.stringify(newMotivator),
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
                    this.props.history.push('/todo');
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            }, () => {
                this.props.history.push('/todo');
            });
    }

    setName(event) {
        this.setState({
            ...this.state,
            name: event.target.value
        })
    }

    setRelationship(event) {
        this.setState({
            ...this.state,
            relationship: event.target.value
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

    deleteMotivator(deleteId) {

        var url = new URL('http://0.0.0.0:8080/delete-motivator');
        var params = { 'id': deleteId }
        url.search = new URLSearchParams(params).toString();

        fetch(url, {
            method: 'delete',
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
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    render() {

        let motivatorExists = false;
        let item = {};
        const { list } = this.state;
        if (list.length) {
            item = list[0];
            motivatorExists = true;
        }
        return (
            <div className="EmergencyMotivator">
                <h2 style={{ color: '#1976D2' }}>Emergency Motivator</h2>
                { !motivatorExists ?
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
                                    id="relationship"
                                    label="Relationship"
                                    variant="outlined"
                                    value={this.state.relationship || ''}
                                    onChange={this.setRelationship}
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
                        <div className="emergency-button">
                            <Button sx={{ m: 1, minWidth: 200 }} onClick={this.addNewMotivator} variant="outlined">Add Motivator</Button>
                        </div>
                    </div>
                    :
                    <div className="motivator-contact">
                        <ListItem
                            key={item.id}
                            disablePadding
                        >
                            <TextField
                                id={item.id}
                                variant="outlined"
                                defaultValue={item.name}
                                InputProps={{
                                    endAdornment:
                                        <InputAdornment position="end">
                                            <IconButton edge="end" aria-label="delete" onClick={() => this.deleteMotivator(item.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </InputAdornment>
                                }}
                            />

                        </ListItem>
                    </div>}
                <BottomNavigator history={this.props.history} />
            </div>
        );
    }
}

export default withRouter(EmergencyMotivator);
