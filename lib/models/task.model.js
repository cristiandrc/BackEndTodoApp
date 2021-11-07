const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  task: String,
});

const taskModel = mongoose.model('Task', taskSchema);

module.exports = taskModel;
