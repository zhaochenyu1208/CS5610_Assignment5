module.exports = function (app) {
    var users = [
        {uid: '123', username: 'alice',    password: 'alice',    firstName: 'Alice',  lastName: 'Wonderland', email: "alice@wonder"  },
        {uid: '234', username: 'bob',      password: 'bob',      firstName: 'Bob',    lastName: 'Marley' , email: "bob@hotmail"},
        {uid: '345', username: 'charly',   password: 'charly',   firstName: 'Charly', lastName: 'Garcia' , email: "charly@google"},
        {uid: '456', username: 'jannunzi', password: 'jannunzi', firstName: 'Jose',   lastName: 'Annunzi', email: "jannunzi@yahoo"}
    ];

    var userModel = require('../model/user/user.model.server');
    app.post('/api/user', createUser);
    // app.get('/api/user?username=username', findUserByUserName);
    app.get('/api/user', findUserByCredentials);
    app.get('/api/user/:uid', findUserById);
    app.put('/api/user/:uid', updateUserById);
    app.delete('/api/user/:uid', deleteUserById);

    function createUser(req, res) {
        var user = new Object();
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.username = req.body.username;
        user.password = req.body.password;
        user.email = req.body.email;
        userModel.findUserByUsername(user.username).then(
            function(response) {
                if (!response) {
                    userModel
                        .createUser(user)
                        .then(function(user) {
                            res.status(200).send(user);
                        }, function(error){
                            console.log('create user error: ' + error);
                            res.status(200).send({message: 'User is already exist!'});
                        });
                } else {
                    res.status(200).send({message: 'User is already exist!'});
                }
            }
        );
    }

    function findUserByUserName(req, res) {
        let username = req.query.username;
        userModel
            .findUserByUsername(username)
            .then(function(user) {
                res.status(200).send(user);
            }, function(error){
                console.log('find user by username error: ' + error);
                res.status(200).send({message: 'User not found!'});
            });
    }

    function findUserByCredentials(req, res) {
        let username = req.query.username;
        let password = req.query.password;
        userModel
            .findUserByCreadentials(username, password)
            .then(function(user) {
                res.status(200).send(user);
            }, function(error){
                console.log('find user by credentials error: ' + error);
                res.status(200).send({message: 'User not found or Wrong password!'});
            });
    }

    function findUserById(req, res) {
        var userId = req.params['uid'];
        userModel
            .findUserById(userId)
            .then(function(user) {
                res.status(200).send(user);
            }, function(error){
                console.log('find user by Id error: ' + error);
                res.status(200).send({message: 'User does exist!'});
            });
    }



    function updateUserById(req, res) {
        var userId = req.params['uid'];
        var user = req.body;
        userModel
            .updateUser(userId, user)
            .then(function(user) {
                res.status(200).send(user);
            }, function(error){
                console.log('update user by Id error: ' + error);
                res.status(200).send({message: 'User not found!'});
            });
    }

    function deleteUserById(req, res) {
        var userId = req.params['uid'];
        userModel
            .deleteUser(userId)
            .then(function(user) {
                res.status(200).send(user);
            }, function(error){
                console.log('delete user by Id error: ' + error);
                res.status(200).send({message: 'User not found!'});
            });
    }
}
