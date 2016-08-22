import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import LoginBar from '../components/LoginBar.jsx';
import LoginForm from '../components/LoginForm.jsx';

export default class Tasks extends Component {
    render() {
        return (
            <Paper zDepth={ 3 } className="tasks-paper">
                <h1>Here will be tasks!</h1>
            </Paper>
        );
    }
}

