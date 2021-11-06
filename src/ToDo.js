import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { withRouter } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import List from '@mui/material/List';
import ToDoItem from './ToDoItem';
import BottomNavigator from './BottomNavigator';
import env from './env';
import './ToDo.css';

class ToDo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            list: [],
            filteredList: [],
            checked: [],
            setChecked: false,
            newTodo: '',
            searchValue: '',
            number: (this.props.history.location.state?.number) ? this.props.history.location.state?.number : ''
        }

        this.handleToggle = this.handleToggle.bind(this);
        this.addNewTodo = this.addNewTodo.bind(this);
        this.updateTodoItem = this.updateTodoItem.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount() {
        const url = env + this.props.history.location.state?.number + '/list';

        fetch(url, { mode: 'cors' })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        ...this.state,
                        isLoaded: true,
                        list: result,
                        filteredList: result
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

    addNewTodo() {
        this.props.history.push('/add-todo', { number: this.props.history.location.state?.number });
    }

    updateTodoItem(todoItem) {
        this.props.history.push('/add-todo', { data: todoItem, number: this.props.history.location.state?.number });
    }

    deleteTodo(deleteId) {

        const url_val = env + this.props.history.location.state?.number + '/delete';

        var url = new URL(url_val);
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

    handleSearch(event) {
        
        let taskSearchString = event.target.value;
        let result = this.state.list;
        if (taskSearchString.length > 0) {
            result = [];
            result = this.state.list.filter((data) => {
                return data.title.search(taskSearchString) != -1;
            });
        }

        this.setState({
            ...this.state,
            searchValue: taskSearchString,
            filteredList: result
        });
    }

    handleToggle(value) {
        const currentIndex = this.state.checked.indexOf(value);
        const newChecked = [...this.state.checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        this.setState({
            ...this.state,
            checked: newChecked
        });
    }

    setNewTodo(event) {
        this.setState({
            ...this.state,
            newTodo: event.target.value
        })
    }
    render() {

        return (
            <div className="ToDo">
                <div className="page-header">
                    <h2 style={{ color: '#1976D2' }}>Priority List</h2>
                </div>
                <div className="todo-search">
                    <OutlinedInput
                        id="outlined-adornment-amount"
                        value={this.state.searchValue}
                        placeholder="Search for tasks"
                        onChange={this.handleSearch}
                        startAdornment={<InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>}
                        label="TaskSearch"
                    />
                </div>
                <div className="display-todos" style={{ display: 'flex', justifyContent: 'center' }} >
                    <List className="todolist" dense sx={{ width: '100%', maxWidth: 250 }}>
                        {this.state.filteredList.map((value) => {
                            const labelId = `checkbox-list-secondary-label-${value.id}`;
                            return (
                                <ToDoItem value={value} updateTodoItem={this.updateTodoItem} deleteTodo={this.deleteTodo} />
                            );
                        })}
                    </List>
                </div>
                <div className="add-todo">
                    <Fab color="primary" aria-label="add" onClick={this.addNewTodo} >
                        <AddIcon />
                    </Fab>
                </div>
                <BottomNavigator history={this.props.history} number={this.props.history.location.state?.number} />
            </div>
        );
    }

}

export default withRouter(ToDo);