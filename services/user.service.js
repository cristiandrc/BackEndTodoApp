const boom = require('@hapi/boom');
const userModel = require('../lib/models/user.model');

class UserService {
  async find() {
    const users = await userModel.find();
    return users;
  }

  async create(user) {
    const mailExist = await userModel.findOne({ email: user.email });
    if (mailExist?.email) {
      throw boom.badRequest();
    }

    const newUser = new userModel(user);
    newUser.save();
    return newUser;
  }
}

module.exports = UserService;
