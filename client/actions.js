import request from './api';

export const ADD_TASK = 'ADD_TASK';
export const REMOVE_TASK = 'REMOVE_TASK';

export function addTaskRequest(task) {
    return dispatch => {
        return request('tasks', 'POST', task.toObject())
            .then(response => {
                return dispatch(addTask(task.set('_id', response.id)));
            });
    };
}

export function addTask(task) {
    return {
        type: ADD_TASK,
        task
    };
}
