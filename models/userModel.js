const users = require('../data/users.json');

function findUsers() {
    return new Promise((resolve, reject) => {
        resolve(users);
    })
}

function findUser(id) {
    return new Promise((resolve, reject) => {
        const user = users.find(user => user.id == id);
        resolve(user);
    })
}

function addUser(user) {
    return new Promise((resolve, reject) => {
        users.push(user);
        console.log(users)
        resolve(users);
    })
}
module.exports = { findUsers, findUser, addUser }