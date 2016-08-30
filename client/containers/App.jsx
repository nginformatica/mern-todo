import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppTheme from '../material-theme';

injectTapEventPlugin();

class App extends Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={ AppTheme }>
                { this.props.children }
            </MuiThemeProvider>
        );
    }
}

App.propTypes = {
    children: React.PropTypes.node.isRequired
};

export default App;
