import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import LoginBar from '../components/LoginBar.jsx';
import LoginForm from '../components/LoginForm.jsx';

export default class Login extends Component {
    render() {
        return (
            <Paper zDepth={ 3 } className="login-paper">
                <LoginBar />
                <LoginForm />
            </Paper>
        );
    }
}

