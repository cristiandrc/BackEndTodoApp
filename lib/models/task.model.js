const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  task: String,
  completed: { type: Boolean, default: false },
});

const taskModel = mongoose.model('Task', taskSchema);

module.exports = taskModel;
