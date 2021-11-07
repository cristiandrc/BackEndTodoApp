const task = [
  {
    id: 1,
    userId: 1,
    task: 'comprar',
  },
  {
    id: 2,
    userId: 1,
    task: 'comprar',
  },
  {
    id: 3,
    userId: 2,
    task: 'comprar',
  },
  {
    id: 4,
    userId: 2,
    task: 'comprar',
  },
  {
    id: 5,
    userId: 3,
    task: 'comprar',
  },
];

class TaskService {
  find(userId) {
    const userTasks = task.filter((d) => d.userId == userId);
    return userTasks;
  }

  create(newTask) {
    task.push(newTask);
    return newTask;
  }
}

module.exports = TaskService;
