const mongodb = require('mongoose');
const bluebird = require('bluebird');
const taskSchema = require('./taskSchema');

mongodb.Promise = bluebird;

const taskModel = mongodb.model('Task', taskSchema);

function searchRegex(value) {
  return new RegExp('.*' + value + '.*', 'i');
}

module.exports = {

  findAll: response => {
    taskModel.find()
      .select('summary description due').exec()
      .then(tasks => {
        response.status(200).send(tasks);
      });
  },

  findById: (id, response) => {
    taskModel.findById(id)
      .select('summary description due').exec()
      .then(task => {
        response.status(200).send(task);
      }, () => {
        response.status(200).send([]);
      });
  },

  findBySummary: (summary, response) => {
    taskModel.find({summary: searchRegex(summary)})
      .select('summary description due').exec()
      .then(() => {
        response.status(200).send();
      }, error => {
        response.status(400).send({message: error.toString()});
      });
  },

  save: (task, response) => {
    taskModel(task).save()
      .then(() => {
        response.status(200).send();
      }, error => {
        response.status(400).send({message: error.toString()});
      });
  },

  update: (task, response) => {
    taskModel.update({_id: task._id}, task).exec()
      .then(() => {
        response.status(200).send();
      }, error => {
        response.status(400).send({message: error.toString()});
      });
  },

  delete: (id, response) => {
    taskModel.remove({_id: id}).exec()
      .then(() => {
        response.status(200).send();
      }, error => {
        response.status(400).send({message: error.toString()});
      });
  }

};
