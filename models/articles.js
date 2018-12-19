var db = require('../db/dbconfig');

var article = {};

article.getAll = function (req, res, next) {
    var slugs = [];
    db.manyOrNone('SELECT * FROM articles JOIN Categories ON Categories.cat_id = Articles.category_id;')
        .then(function (result) {
            // console.log("kjdbcdsbc" , result);
            result.forEach(element => {
                var slug = element.title.replace(/\s+/g, '-');
                // console.log('slug',slug);
                slugs.push(slug);
            });
            result.forEach(function (element, index) {
                element.slug = slugs[index];
            });
            res.locals.articles = result;
            next();
        })
        .catch(function (error) {
            console.log(error);
        })
}


article.find = function (req, res, next) {
    var dashedTitle = req.params.slug;
    var undashedTitle = req.params.slug.replace(/\-+/g, ' ');
    db.one("SELECT * FROM articles JOIN Categories ON articles.category_id = Categories.cat_id WHERE title = $1;", [undashedTitle])
        .then(function (result) {
            result.slug = dashedTitle;
            res.locals.article = result;
            next();
        })
        .catch(function (error) {
            console.log("FIND",error);
            next();
        })
}

article.create = function (req, res, next) {

    // console.log(  " res.locals.category_id" , res.locals.category_id)
    // console.log("body" , req.body )
    db.one('INSERT INTO Articles(title, content , category_id) VALUES($1,$2,$3) RETURNING id;', [req.body.title, req.body.content, res.locals.category_id])
        .then(function (result) {
            res.locals.article_id = result.id;
            next();

        })
        .catch(function (error) {
            console.log(error);
        })
}

article.delete = function (req, res, next) {
    console.log('del: entered');
    db.none("DELETE FROM Articles WHERE id= $1;", [req.body.id])
        .then(function (result) {
            next();
            console.log('del: success');
        }).catch(function (error) {
            console.log(error);
            console.log('del: faild');
            next();
        })
}

article.update = function (req, res, next) {
    var dashedTitle = req.params.slug;
    db.none("UPDATE Articles SET title = $1, content = $2, category_id = $3 WHERE id = $4 RETURNING id;",
        [
            req.body.title,
            req.body.content,
            req.body.category,
            req.body.id
        ]
    )
        .then(function (result) {
            result.slug = req.params.slug.replace(/\s+/g, '-');
            res.locals.newTitle = result.title;
            next();
        })
        .catch(function (error) {
            console.log(error);
            next();
        })
}

module.exports = article;