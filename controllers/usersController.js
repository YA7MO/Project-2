var express = require('express');
var router = express.Router();
var session = require('../models/session');
var user = require('../models/user');
var auth = require('../middleware/auth');

router.get('/new', renderNew);
router.get('/:id', auth.onlyAdmins, user.find, renderShow);
router.delete('/login', session.delete, redirectLogin);
router.post('/', user.create, redirectShow);

function renderNew(req, res) {
    res.render('./users/new');
}

function renderShow(req, res) {
    var mustacheVariables = {
        user: res.locals.user
    }

    res.render('./users/show', mustacheVariables)
}

function redirectShow(req, res) {
    res.redirect(`/users/${res.locals.userId}`);
}

function redirectLogin(req, res) {
    res.redirect('/login');
}

module.exports = router;