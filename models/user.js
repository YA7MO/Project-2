

var bcrypt = require('bcrypt');
var db = require('../db/dbconfig');
var user = {};

user.find = function(req, res, next){
  db.one("SELECT * FROM admins WHERE id=$1;", [req.params.id])
    .then(function(result){
      res.locals.user = result;
      next();
    })
    .catch(function (error) {
      console.log(error);
      next();
    })
}

user.create = function(req, res, next){

  db.one("INSERT INTO admins (username, passwordKey) VALUES($1, $2) RETURNING *;",
        [req.body.username.toLowerCase(), bcrypt.hashSync(req.body.passwordKey, 10)])
    .then(function(result){
      req.session.username = result;
      res.locals.userId = result.id;
      next();
    })
    .catch(function(error){
      console.log(error);
      next();
    })
}

module.exports = user;