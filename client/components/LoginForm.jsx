import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }

        this.attemptLogin.bind(this.attemptLogin);
    }

    attemptLogin(event) {

    }

    render() {
        return (
            <div className="login-content">
                <form onSubmit={ this.handleSubmit }>
                    <TextField
                        floatingLabelText="E-mail"
                        fullWidth={true}
                    />
                    <TextField
                        floatingLabelText="Password"
                        type="password"
                        fullWidth={true}
                    />
                    <RaisedButton 
                        className="login-button" 
                        label="Login" 
                        secondary={true}
                        onTouchTap={ this.attemptLogin }
                    />
                </form>
            </div>
        );
    }
}