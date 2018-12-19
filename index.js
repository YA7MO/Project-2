var express = require('express');
var app = express();
var port = 3000;

// mustache config
var mustache = require('mustache-express');
app.engine('html', mustache());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// body parser config
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// method override config 
var methodOverride = require('method-override');
app.use(methodOverride('_method'));
// 
var markdown = require( "markdown" ).markdown;
var articleController = require('./controllers/articleConstroller');
var categoryController = require('./controllers/categoryController');

// auth 
// express session 
var session = require('express-session')

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));


// main rutes 
app.use('/home' , articleController);
app.use('/category' , categoryController);


var usersController = require('./controllers/usersController');
var sessionsController = require('./controllers/sessionsController');

app.use('/login', sessionsController);
app.use('/users', usersController);

app.get('/',function(req,res){

    res.render('./login');
})
app.listen(port, function () {
  console.log('---------------------------------------');
  console.log('Express listening on localhost:' + port);
  console.log('---------------------------------------');
})