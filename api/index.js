const { createNewTask, getUserTasks, editTask, removeTask } = require('../controllers/task');
const { signup, login } = require('../controllers/user');
const { isAuthorized } = require('../middlewares/user');
const { createTaskSchema, updateTaskSchema } = require('../validations/task');
const { createAccountSchema, loginSchema } = require('../validations/user');

const router = require('express').Router();

const welcomeSnippet = `<div style='display:flex; justify-content: center; align-items:center'; ><h1>Welcome to Todo List Server</h1></div>`

router.get('/', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(welcomeSnippet);
    res.end();
});

//User
router.post('/signup', createAccountSchema, signup);
router.post('/login', loginSchema, login);

//Task
router.post('/task', isAuthorized, createTaskSchema, createNewTask);
router.get('/tasks', isAuthorized, getUserTasks);
router.put('/task/:id', isAuthorized, updateTaskSchema, editTask);
router.delete('/task/:id', isAuthorized, removeTask);

module.exports = router;