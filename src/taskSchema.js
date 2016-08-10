const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  summary: {
    type: String,
    required: [true, "Summary is required!"]
  },
  description: String,
  due: {
    type: Date,
    default: Date.now
  }
});

module.exports = taskSchema;
