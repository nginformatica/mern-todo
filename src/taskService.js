const mongodb = require('mongoose');
const bluebird = require('bluebird');
const taskSchema = require('./taskSchema');

mongodb.Promise = bluebird;

const taskModel = mongodb.model('Task', taskSchema);

function searchRegex(value) {
  return new RegExp('.*' + value + '.*', 'i');
}

module.exports = {

  find: (id, response) => {
    taskModel.findById(id).exec()
      .then((task) => {
        response.status(200).send(task);
      }, () => {
        response.status(200).send([]);
      });
  },

  findBySummary: (summary, response) => {
    taskModel.find({summary: searchRegex(summary)})
      .select('summary description due')
      .exec((error, tasks) => {
        if (error) response.status(400).send(error);
        else response.status(200).send(tasks);
      });
  },

  save: (task, response) => {
    taskModel(task).save().then(() => {
      response.status(200).send();
    }, reason => {
      response.status(400).send({
        message: reason.toString()
      });
    });
  }

};
