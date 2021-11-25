const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { config } = require('../config/');

const UserService = require('./user.service');
const service = new UserService();

class AuthService {
  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) throw boom.unauthorized();

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw boom.unauthorized();

    return user;
  }

  signToken(user) {
    const payload = {
      sub: user.id,
    };

    const token = jwt.sign(payload, config.jwtSecretLogin);

    return { user, token };
  }

  async changePassword(userId, password, newPassword) {
    const user = await service.findOne(userId);
    if (!user) throw boom.unauthorized();

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw boom.unauthorized();

    const hash = await bcrypt.hash(newPassword, 10);

    const isUpdate = await service.update(userId, { password: hash });

    return isUpdate;
  }

  async sendRecovery(email) {
    const user = await service.findByEmail(email);
    if (!user) throw boom.unauthorized();

    const payload = { sub: user.id };
    const token = jwt.sign(payload, config.jwtSecretRecovery, {
      expiresIn: '5min',
    });
    const link = `https://todo-app-cristiandrc.vercel.app/recovery/${token}`;

    await service.update({ _id: user.id }, { recoveryToken: token });

    const infoEmail = {
      from: config.email,
      to: user.email,
      subject: 'recovery Password',
      html: `<div>Hola ${user.name} puedes recuperar tu contraseña
      en el siguiente link <a href='${link}' target="_blank">Recovery Password</a>
      </div>`,
    };

    const answer = this.sendEmail(infoEmail);
    return answer;
  }

  async recoveryPassword(token, newPassword) {
    //verificar token
    const payload = jwt.verify(
      token,
      config.jwtSecretRecovery,
      (err, decoded) => {
        if (err) throw boom.unauthorized(err.message);
        return decoded;
      }
    );
    const user = await service.findOne({ _id: payload.sub });
    if (user.recoveryToken !== token) {
      throw boom.badRequest('token invalido');
    }

    const hash = await bcrypt.hash(newPassword, 10);

    const isUpdate = await service.update(payload.sub, {
      password: hash,
      recoveryToken: null,
    });

    return isUpdate;
  }

  async sendEmail(infoEmail) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: true, // true for 465, false for other ports
      port: 465,
      auth: {
        user: config.email,
        pass: config.passwordEmail,
      },
    });
    await transporter.sendMail(infoEmail);

    return { message: 'mail sended' };
  }
}

module.exports = AuthService;
