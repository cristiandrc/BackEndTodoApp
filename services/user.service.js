const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const userModel = require('../lib/models/user.model');

class UserService {
  async find() {
    const users = await userModel.find();
    return users;
  }
  async findOne(id) {
    const user = await userModel.findOne({ _id: id });
    return user;
  }

  async findByEmail(email) {
    const user = await userModel.findOne({ email: email });
    // if (!user) throw boom.notFound('user not found');
    return user;
  }

  async create(user) {
    const mailExist = await userModel.findOne({ email: user.email });
    if (mailExist?.email) {
      throw boom.badRequest();
    }
    const hash = await bcrypt.hash(user.password, 10);
    const newUser = new userModel({ ...user, password: hash });
    newUser.save();

    return newUser;
  }

  async update(id, newData) {
    const isUpdate = await userModel.updateOne({ _id: id }, { ...newData });

    return isUpdate;
  }
}

module.exports = UserService;
