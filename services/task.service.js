const taskModel = require('../lib/models/task.model');
class TaskService {
  async find(userID) {
    return new Promise((resolve, reject) => {
      taskModel
        .find({ userId: userID })
        .populate('userId')
        .exec((err, populate) => {
          if (err) reject(err);
          resolve(populate);
        });
    });
  }

  create(task) {
    const newTask = new taskModel(task);
    newTask.save();
    return newTask;
  }
}

module.exports = TaskService;
