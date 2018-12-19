var express = require('express');
var router = express.Router();
var session = require('../models/session');

router.get('/', renderNew);
router.post('/', session.create, redirectShow);

function renderNew(req, res){
  console.log("req.session.user xx" , req.session.user)
  res.render('./login');
}

function redirectShow(req, res){

    console.log("req.session.user show  " , req.session.user)
  if(req.session.user){
    res.redirect(`/users/${req.session.user.id}`)
  }else{
    res.redirect('/login');
  }
}

module.exports = router;