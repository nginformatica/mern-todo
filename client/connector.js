import { connect } from 'react-refetch';

const Connector = connect.defaults({
    handleResponse: response => {
        const message = response.text();
        if (response.status >= 200 && response.status < 300) {
            return '';
        } else {
            return Promise.reject('Invalid request!');
        }
    }
});

export default Connector;
