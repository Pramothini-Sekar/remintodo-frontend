import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { withRouter } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDateTimePicker from '@mui/lab/DesktopDateTimePicker';
import { v4 as uuidv4 } from 'uuid'; 
import BottomNavigator from './BottomNavigator';

import './AddNewTodo.css';

class AddNewTodo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            list: [],
            mode: this.props.history.location.state?.data ? 'edit' : 'add',
            title: this.props.history.location.state?.data ? this.props.history.location.state?.data.title : '',
            description: this.props.history.location.state?.data ? this.props.history.location.state?.data.description : '',
            deadline: this.props.history.location.state?.data ? new Date(this.props.history.location.state?.data.deadline) : new Date(),
            status: this.props.history.location.state?.data ? this.props.history.location.state?.data.status : ''
        }

        this.setTitle = this.setTitle.bind(this);
        this.setDescription = this.setDescription.bind(this);
        this.setDeadline = this.setDeadline.bind(this);
        this.setTaskStatus = this.setTaskStatus.bind(this);
        this.addNewTodo = this.addNewTodo.bind(this);
        this.updateTodoItem = this.updateTodoItem.bind(this);
    }

    componentDidMount() {
        const item = this.props.history.location.state?.data;
        console.log("Showing item ", item);
    }

    setTitle(event) {
        this.setState({
            ...this.state,
            title: event.target.value
        })
    }

    setDescription(event) {
        this.setState({
            ...this.state,
            description: event.target.value
        })
    }

    setDeadline(value) {
        this.setState({
            ...this.state,
            deadline: value
        })
    }

    setTaskStatus(event) {
        this.setState({
            ...this.state,
            status: event.target.value
        })
    }

    addNewTodo() {
        let newTodoItem = { 
            id: uuidv4().toString(), 
            title: this.state.title,
            description: this.state.description,
            deadline: this.state.deadline,
            status: this.state.status 
        };
        fetch('https://remintodo-server.herokuapp.com/add', {
            method: 'post',
            body: JSON.stringify(newTodoItem),
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

    updateTodoItem() {
        let item = { 
            id: this.props.history.location.state?.data.id, 
            title: this.state.title,
            description: this.state.description,
            deadline: this.state.deadline,
            status: this.state.status 
        };
        fetch('https://remintodo-server.herokuapp.com/update', {
            method: 'put',
            body: JSON.stringify(item),
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

    render() {
        return (
            <div>
                <h2 style={{ color: '#1976D2' }}>New Task</h2>
                <div className="add-contact">
                    <div className="text-basic">
                        <TextField
                            id="task"
                            label="Task Title"
                            variant="outlined"
                            sx={{ m: 1, width: 230 }}
                            value={this.state.title || ''}
                            onChange={this.setTitle}
                        />
                    </div>
                    <div className="text-basic">
                        <TextField
                            id="description"
                            label="Description"
                            variant="outlined"
                            sx={{ m: 1, width: 230 }}
                            value={this.state.description || ''}
                            onChange={this.setDescription}
                        />
                    </div>
                    <div className="date-basic">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDateTimePicker
                                renderInput={(props) => <TextField {...props} />}
                                label="Task Deadline"
                                value={this.state.deadline}
                                onChange={(newValue) => {
                                    this.setDeadline(newValue);
                                }}
                            />
                        </LocalizationProvider>
                    </div>

                    <div className="select-status">
                        <FormControl sx={{ width: 230 }}>
                            <InputLabel id="select-status">Task Status</InputLabel>
                            <Select
                                labelId="select-status"
                                id="select-status"
                                value={this.state.status}
                                label="When to contact?"
                                onChange={this.setTaskStatus}
                            >
                                <MenuItem value={"Yet to Start"}>Yet to Start</MenuItem>
                                <MenuItem value={"In Progress"}>In Progress</MenuItem>
                                <MenuItem value={"Completed"}>Completed</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div className="task-add-button">
                    {this.state.mode == 'add' ? 
                    <Button sx={{ m: 1, minWidth: 230 }} onClick={this.addNewTodo} variant="outlined">Add Task</Button>
                    :
                    <Button sx={{ m: 1, minWidth: 230 }} onClick={this.updateTodoItem} variant="outlined">Update Task</Button>}
                </div>
                <BottomNavigator history={this.props.history} />
            </div>
        );
    }
}

export default withRouter(AddNewTodo);