var express = require('express');
router = express.Router();

var category = require('../models/categories');
var article = require('../models/articles');
var auth = require('../middleware/auth');


router.get('/', category.getAll, renderIndex);
router.get('/:catname', auth.hideMethods, category.ShowArticlesByCat, category.getAll, renderShow);
router.get('/:catname/new', category.getAll, renderNew);
router.post('/:catname', category.find, article.create, redirectShow);


function renderIndex(req, res) {
    var mustacheVariables = {
        categories: res.locals.categories
    }

    res.render('./categories/index', mustacheVariables);
}

function renderShow(req, res) {
    var mustacheVariables = {
        articleByCat: res.locals.articleByCat,
        categoryName: req.params.catname
    }
    res.render('./categories/show', mustacheVariables)
}

function renderNew(req, res) {
    var catName = req.params.catname;
    res.render('./articles/new', { catName: catName });
}

function redirectShow(req, res) {

    res.redirect(`/category/${req.params.catname}/`)
}
module.exports = router;