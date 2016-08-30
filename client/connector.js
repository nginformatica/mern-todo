import { connect } from 'react-refetch';

const Connector = connect.defaults({
    handleResponse: response => {
        if (response.status >= 200 && response.status < 300) {
            return '';
        }
        return Promise.reject('Invalid request!');
    }
});

export default Connector;
