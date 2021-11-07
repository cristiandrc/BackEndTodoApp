const users = [
  {
    id: 1,
    name: 'cristian',
  },
];

const task = [
  {
    id: 1,
    userId: 1,
    task: 'comprar',
  },
  {
    id: 1,
    userId: 1,
    task: 'comprar',
  },
];

class UserService {
  find() {
    return users;
  }

  create(user) {
    users.push(user);
    return user;
  }
}

module.exports = UserService;
