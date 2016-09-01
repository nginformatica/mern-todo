import { createStore } from 'redux';
import reducer from './reducer';

export default function configureStore() {
    return createStore(reducer);
}
