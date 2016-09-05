import { List } from 'immutable';
import request from './api';

export const ADD_TASK = 'ADD_TASK';
export const ADD_TASKS = 'ADD_TASKS';
export const REMOVE_TASK = 'REMOVE_TASK';
export const FETCH_TASKS = 'FETCH_TASKS';

export function addTaskRequest(task) {
    return dispatch => {
        return request('tasks', 'POST', task.toObject())
            .then(response => {
                return dispatch(addTask(task.set('_id', response.id)));
            });
    };
}

export function fetchTasks() {
    return dispatch => request('tasks')
        .then(response => dispatch(addTasks(JSON.parse(response))));
}

export function removeTaskRequest(taskId) {
    return dispatch => request('tasks/' + taskId, 'DELETE')
        .then(() => dispatch(removeTask(taskId)));
}

export function addTask(task) {
    return {
        type: ADD_TASK,
        task
    };
}

export function removeTask(taskId) {
    return {
        type: REMOVE_TASK,
        taskId
    };
}

export function addTasks(tasks) {
    return {
        type: ADD_TASKS,
        tasks: new List(tasks)
    };
}
