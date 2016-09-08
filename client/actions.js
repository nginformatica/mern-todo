import { List, Map } from 'immutable';
import request from './api';

export const ADD_TASK = 'ADD_TASK';
export const ADD_TASKS = 'ADD_TASKS';
export const REMOVE_TASK = 'REMOVE_TASK';
export const FETCH_TASKS = 'FETCH_TASKS';

export function addTaskRequest(task) {
    return dispatch => {
        return request('tasks', 'POST', task)
            .then(response => {
                const task2 = task;
                task2._id = JSON.parse(response).id;
                return dispatch(addTask(task2));
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
