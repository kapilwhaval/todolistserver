const { createTask, getTasks, updateTask, deleteTask } = require("../services/task")

exports.createNewTask = (req, res) => {
    createTask(req.body)
        .then(newTask => res.status(200).send(newTask))
        .catch(err => res.status(400).send(err))
}

exports.getUserTasks = (req, res) => {
    getTasks({ user: req.user_id })
        .then(allTasks => res.status(200).send(allTasks))
        .catch(err => res.status(400).send({ message: 'error fetching tasks', err }))
}

exports.editTask = (req, res) => {
    updateTask(req.params.id, req.body)
        .then(updatedTask => res.status(200).send(updatedTask))
        .catch(err => res.status(400).send({ message: 'error updating tasks', err }))
}

exports.removeTask = (req, res) => [
    deleteTask(req.params.id)
        .then(() => res.status(200).send({ message: 'Task deleted successfully' }))
        .catch(err => res.status(400).send({ message: 'error deleting tasks', err }))
]