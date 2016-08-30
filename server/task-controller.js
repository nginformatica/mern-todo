import TaskModel from './model/task';

function searchRegex(value) {
    return new RegExp('.*' + value + '.*', 'i');
}

export function findAll(request, response) {
    TaskModel.find({ owner: request.user._id })
        .select('summary description isDone due').exec()
        .then(tasks => {
            response.status(200).send(tasks);
        });
}

export function findById(request, response) {
    TaskModel.findOne({ _id: request.params.id, owner: request.user.id })
        .select('summary description isDone due').exec()
        .then(task => {
            response.status(200).send(task);
        }, () => {
            response.status(200).send();
        });
}

export function findBySummary(request, response) {
    TaskModel.find({
        owner: request.user._id,
        summary: searchRegex(request.params.summary)
    }).select('summary description isDone due')
        .exec()
        .then(task => {
            response.status(200).send(task);
        }, () => {
            response.status(200).send([]);
        });
}

export function save(request, response) {
    const task = request.body;
    task.owner = request.user._id;
    new TaskModel(task).save()
        .then(() => {
            response.status(201).send({ message: 'Task saved!' });
        }, error => {
            response.status(400).send({ message: error.toString() });
        });
}

export function update(request, response) {
    const task = request.body;
    const id = task._id;
    delete task._id;
    TaskModel.update({ _id: id, owner: request.user.id }, task)
        .exec()
        .then(() => {
            response.status(200).send({ message: 'Task updated!' });
        }, error => {
            response.status(400).send({ message: error.toString() });
        });
}

export function remove(request, response) {
    TaskModel.remove({ _id: request.params.id, owner: request.user.id })
        .exec()
        .then(() => {
            response.status(200).send({ message: 'Task removed!' });
        }, error => {
            response.status(400).send({ message: error.toString() });
        });
}
