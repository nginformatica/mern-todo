import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import LoginConnector from './LoginConnector';

class LoginForm extends Component {
    constructor(props, context) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }

        this.onMailChange = this.onMailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.attemptLogin = this.attemptLogin.bind(this);
    }

    onMailChange(event) {
        this.setState({ email: event.target.value });
    }    

    onPasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    attemptLogin() {
        this.props.login(this.state);
    }

    getError(response) {
        if (response && response.rejected) {
            return response.reason;
        } else {
            return '';
        }
    }

    render() {
        const response = this.props.loginResponse;
        const errorMessage = this.getError(response);

        return (
            <div className="login-form">
                <TextField
                    floatingLabelText="E-mail"
                    onChange={ this.onMailChange }
                    fullWidth={ true }
                />
                <TextField
                    floatingLabelText="Password"
                    type="password"
                    onChange={ this.onPasswordChange }
                    fullWidth={ true }
                />
                <span>{ errorMessage }</span>
                <RaisedButton 
                    className="login-button" 
                    label="Login" 
                    disabled = { 
                        response &&
                        response.pending 
                    }
                    secondary={ true }
                    onTouchTap={ this.attemptLogin }
                />
            </div>
        );
    }
}

export default LoginConnector(props => {
    return {
        login: userLogin => ({
            loginResponse: {
                url: 'api/auth',
                method: 'POST',
                body: JSON.stringify(userLogin),
                force: true
            }
        })
    }
})(LoginForm)
