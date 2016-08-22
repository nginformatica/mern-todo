import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppTheme from '../materialTheme';

injectTapEventPlugin();

export default class App extends Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={ AppTheme }>
                { this.props.children }
            </MuiThemeProvider>
        );
    }
}