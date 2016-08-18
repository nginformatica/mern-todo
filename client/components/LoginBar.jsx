import React from 'react';
import AppBar from 'material-ui/AppBar';
import AboutDialogButton from './AboutDialogButton.jsx';

export default class LoginBar extends React.Component {
    render() {
        return (
            <AppBar 
                title="Login"
                iconElementRight={ <AboutDialogButton /> }
                iconElementLeft={ <div></div> }
            />
        );
    }
}