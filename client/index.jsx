import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import App from './containers/App.jsx';
import Login from './containers/Login.jsx';
import Tasks from './containers/Tasks.jsx';

class Hello extends React.Component {
    render() {
        return <h1>Hello World!</h1>;
    }
}

const routes = (
    <Route component={ App }>
        <Route path='/' component={ Hello } />
        <Route path='/login' component={ Login } />
        <Route path='/tasks' component={ Tasks } /> 
    </Route>
);

ReactDOM.render(
    <Router history={ browserHistory }>{ routes }</Router>,
    document.getElementById('app')
);
