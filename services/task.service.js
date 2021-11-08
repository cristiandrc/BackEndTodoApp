const boom = require('@hapi/boom');

const taskModel = require('../lib/models/task.model');
const userModel = require('../lib/models/user.model');
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

  async create(task) {
    const newTask = new taskModel(task);
    const error = await newTask.save().catch((err) => {
      console.log('err');
      return boom.badRequest();
    });
    if (error?.isBoom) throw error;
    return newTask;
  }

  async update({ id, data }) {
    const task = await taskModel.updateOne({ _id: id }, { ...data });
    return task;
  }

  async delete({ id }) {
    const taskDelete = await taskModel.deleteOne({ _id: id });
    return taskDelete;
  }
}

module.exports = TaskService;
