import { List } from 'immutable';
import { ADD_TASK, ADD_TASKS, REMOVE_TASK } from './actions';

const initialState = { tasks: new List() };

const reducer = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case ADD_TASK:
            return {
                tasks: state.tasks.push(action.task)
            };

        case ADD_TASKS:
            return {
                tasks: state.tasks.concat(action.tasks)
            };

        case REMOVE_TASK:
            return {
                tasks: state.tasks.filterNot(task => {
                    return task._id === action.taskId;
                })
            };

        default: return state;
    }
};

export default reducer;
