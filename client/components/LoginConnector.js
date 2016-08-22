import { connect } from 'react-refetch';

const LoginConnector = connect.defaults({
    handleResponse: response => {
        const message = response.text();
        if (response.status >= 200 && response.status < 300) {
            return 'You logged in!';
        } else if (response.status === 401) {
            return Promise.reject('Invalid e-mail or password!');
        } else {
            throw new Error('Unexpected response: ' + response.status);
        }
    }
});

export default LoginConnector;