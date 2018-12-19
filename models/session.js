var bcrypt = require('bcrypt');
var db = require('../db/dbconfig');

var session = {};

session.create = function(req, res, next){
  var username = req.body.username.toLowerCase();
  console.log("creatin a session");
  db.one("SELECT * FROM admins WHERE username= $1;", [username])
    .then(function(result){
      if( bcrypt.compareSync(req.body.passwordKey, result.passwordkey) ){
        req.session.user = result;
      }
      next();
    })
    .catch(function(error){
      console.log(error);
      next();
    })
}

session.delete = function(req, res, next){
  req.session.user = null;
  next();
}

module.exports = session;