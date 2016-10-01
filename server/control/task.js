import { Map } from 'immutable';
import TaskModel from '../model/task';

function searchRegex(value) {
    return new RegExp('.*' + value + '.*', 'i');
}

export function findAll(owner) {
    return TaskModel.find({ owner })
        .select('summary description isDone due')
        .exec();
}

export function findById(owner, id) {
    return TaskModel.findOne({ owner, _id: id })
        .select('summary description isDone due')
        .exec()
}

export function findBySummary(owner, summary) {
    return TaskModel.find({
        owner,
        summary: searchRegex(summary)
    }).select('summary description isDone due').exec();
}

export function save(owner, task) {
    return Promise.resolve(new Map(task))
        .then(task => task.set('owner', owner))
        .then(task => new TaskModel(task.toJS()).save())
        .then(task => ({ id: task._id }));
}

export function update(owner, task) {
    const id = task._id;
    delete task._id;
    return TaskModel.update({ owner, _id: id }, task).exec();
}

export function remove(owner, id) {
    return TaskModel.remove({ owner, _id: id }).exec();
}
