const users = require('../data/users.json');
const { writeDateToFile } = require('../utils');
const {v4: uuidv4} = require('uuid');

function findUsers() {
    return users;
}

function findUserById(id) {
    return new Promise((resolve, reject) => {
        const user = users.find(user => user.id == id);
        resolve(user);
    })
}

function addUser(user) {
    return new Promise((resolve, reject) => {
        const newUser = {id: uuidv4(), ...user};
        users.push(newUser);
        writeDateToFile('./data/users.json', users);
        resolve(newUser.id);
    })
}

function findLogginUser(logginUser) {
        const user = users.find(user => user.email == logginUser.email && user.password == logginUser.password);
        return user;
}

function getUserId(username) {
        const user = users.find(user => user.username == username);
        return user.id;
}
module.exports = { findUsers, findUserById, addUser, findLogginUser, getUserId }