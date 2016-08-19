import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Paper from 'material-ui/Paper';
import LoginBar from './components/LoginBar.jsx';
import LoginForm from './components/LoginForm.jsx';
import AppTheme from './materialTheme'

injectTapEventPlugin();

class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={ AppTheme }>
                <Paper zDepth={ 3 } className="login-paper">
                    <LoginBar />
                    <LoginForm />
                </Paper>
            </MuiThemeProvider>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);



