import { List } from 'immutable';
import { ADD_TASK, REMOVE_TASK } from './actions';

const initialState = { tasks: new List() };

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TASK:
            return {
                tasks: state.tasks.push(action.task)
            };

        case REMOVE_TASK:
            return {
                tasks: state.tasks.filterNot(task => {
                    return task._id === action.task._id;
                })
            };

        default:
            return state;
    }
};

export default reducer;
