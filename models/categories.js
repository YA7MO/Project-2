var db = require('../db/dbconfig');

category = {};

category.getAll = function(req,res,next){
    db.manyOrNone('SELECT * FROM categories;')
    .then(function(result){
        res.locals.categories = result;
        next();
    })
    .catch(function(error){
        console.log(error);
    })

}
category.find = function(req,res,next){
    // console.log("category.find " , req.params.catname);
    db.one('SELECT cat_id FROM categories WHERE category_name=$1;', [req.params.catname])
    .then(function(result){

        // console.log(r    esult);
        res.locals.category_id = result.cat_id
        next();
    })
    .catch(function(error){
        console.log(error)
    })

}

category.ShowArticlesByCat = function(req,res,next) {
    var slugs = [];
    db.manyOrNone("select * from Articles Join Categories on Categories.cat_id = articles.category_id where Categories.category_name = $1;",[req.params.catname])
    .then(function(result){
        result.forEach(element => {
            var slug = element.title.replace(/\s+/g,'-');
            // console.log('slug',slug);
            slugs.push(slug);
        });
        result.forEach(function(element,index){
            element.slug = slugs[index];
        });
        res.locals.articleByCat = result;
      
        next();
    })
    .catch(function(error){
        console.log(error)
    })
}

module.exports = category;