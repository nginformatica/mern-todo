import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import AboutDialogButton from './AboutDialogButton';

export default class TodoBar extends Component {
    render() {
        return (
            <AppBar 
                title="To-Do Application"
                iconElementRight={ <AboutDialogButton /> }
                iconElementLeft={ <div></div> }
            />
        );
    }
}