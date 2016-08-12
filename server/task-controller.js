import TaskModel from './model/task';

function searchRegex(value) {
    return new RegExp('.*' + value + '.*', 'i');
}

export function findAll(response) {
    TaskModel.find()
    .select('summary description isDone due').exec()
    .then(tasks => {
        response.status(200).send(tasks);
    });
}

export function findById(id, response) {
    TaskModel.findById(id)
    .select('summary description isDone due').exec()
    .then(task => {
        response.status(200).send(task);
    }, () => {
        response.status(200).send([]);
    });
}

export function findBySummary(summary, response) {
    TaskModel.find({ summary: searchRegex(summary) })
    .select('summary description due').exec()
    .then(() => {
        response.status(200).send();
    }, error => {
        response.status(400).send({ message: error.toString() });
    });
}

export function save(task, response) {
    new TaskModel(task).save()
    .then(() => {
        response.status(200).send();
    }, error => {
        response.status(400).send({ message: error.toString() });
    });
}

export function update(task, response) {
    TaskModel.update({ _id: task._id }, task).exec()
    .then(() => {
        response.status(200).send();
    }, error => {
        response.status(400).send({ message: error.toString() });
    });
}

export function remove(id, response) {
    TaskModel.remove({ _id: id }).exec()
    .then(() => {
        response.status(200).send();
    }, error => {
        response.status(400).send({ message: error.toString() });
    });
}
