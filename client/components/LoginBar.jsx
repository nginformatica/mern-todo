import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import AboutDialogButton from './AboutDialogButton';

export default class LoginBar extends Component {
    render() {
        return (
            <AppBar
                title="Login"
                iconElementRight={ <AboutDialogButton/> }
                iconElementLeft={ <div/> }
            />
        );
    }
}
