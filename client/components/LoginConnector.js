import { connect } from 'react-refetch';
import { browserHistory } from 'react-router';

const LoginConnector = connect.defaults({
    handleResponse: response => {
        const message = response.text();
        if (response.status >= 200 && response.status < 300) {
            browserHistory.push('/tasks');
        } else {
            return Promise.reject('Invalid e-mail or password!');
        }
    }
});

export default LoginConnector;