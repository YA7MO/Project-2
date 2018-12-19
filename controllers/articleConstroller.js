var express = require('express');
var router = express.Router();
var article = require('../models/articles');
var category = require('../models/categories');
var auth = require('../middleware/auth');


router.get('/', article.getAll, category.getAll, renderIndex);
router.get('/:slug', auth.hideMethods, article.find, category.getAll, renderShow);
router.get('/:slug/edit', article.find, category.getAll, renderEdit);
router.delete('/:id', article.delete, category.getAll, redirectIndex);
router.put('/:slug/edit/true', article.update, redirectShow);

function renderIndex(req, res) {
    var mustacheVeriables = {
        articles: res.locals.articles
    }
    res.render('./articles/index', mustacheVeriables);
}
function renderShow(req, res) {

    mustacheVeriables = res.locals.article
    // var content = mustacheVeriables.content;
    // var markdownContent = md.render(content);
    // mustacheVeriables.content = markdownContent;
    res.render('./articles/show', mustacheVeriables);
}
function renderEdit(req, res) {
    mustacheVeriables = res.locals.article
    res.render('./articles/edit', mustacheVeriables);
}

function redirectIndex(req, res) {

    res.redirect(`/home`);

}

function redirectShow(req, res) {
    console.log(req.params.slug);
    res.redirect(`/home/${req.params.slug}`);

}

module.exports = router;