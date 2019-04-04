var mongoose =  require('mongoose');
var userSchema = require('./user.schema.server');

var userModel = mongoose.model('User', userSchema);
// var websiteModel = require('../website/website.model.server');

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCreadentials = findUserByCreadentials;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;

function createUser(user) {
    return userModel.create(user);
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function findUserByUsername(username) {
    return userModel.findOne({username:username});
}

function findUserByCreadentials(username, password) {
    return userModel.findOne({username: username, password: password});
}

function updateUser(userId,user) {
    return userModel.findByIdAndUpdate(userId,user,{new: true, safe: true});
}

function deleteUser(userId){
    return userModel.findByIdAndRemove(userId);
}

module.exports = userModel;
