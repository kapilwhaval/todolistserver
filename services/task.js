const Task = require('../models/task');

exports.createTask = (query) => {
    return Task.create(query)
        .then(user => {
            if (!user) throw ({ message: 'Error creating task!' });
            else return user;
        })
        .catch(err => { throw err })
}

exports.getTasks = (query) => {
    return Task.find(query)
    .then(tasks => tasks)
    .catch(err => { throw err })
}

exports.updateTask = (id, data) => {
    return Task.findByIdAndUpdate(id, data, { new: true })
        .then((updatedTask) => {
            if(updatedTask) return updatedTask
            else throw ({ message: 'Task not found' })
         })
        .catch(err => { throw err })
}

exports.deleteTask = (id) => {
    return Task.findByIdAndDelete(id)
        .then((res) => {
            if(res) return res
            else throw ({message: 'Task not found'})
        })
        .catch(err => { throw err })
}