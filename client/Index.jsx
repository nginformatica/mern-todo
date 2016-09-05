import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import configureStore from './store';
import App from './containers/App.jsx';
import Login from './containers/Login.jsx';
import Tasks from './containers/Tasks.jsx';

class Hello extends React.Component {
    render() {
        return <h1>Hello World!</h1>;
    }
}

const application = (
    <Provider store={ configureStore() }>
        <Router history={ browserHistory }>
            <Route component={ App }>
                <Route path="/" component={ Hello }/>
                <Route path="/login" component={ Login }/>
                <Route path="/tasks" component={ Tasks }/>
            </Route>
        </Router>
    </Provider>  
);

ReactDOM.render(application, document.getElementById('app'));
