// configure postgres to connect our db to our express app
var pgPromise = require('pg-promise');
var pgInstance = pgPromise();

var config = {
  host: 'localhost',
  port: 5432,
  database: 'blog_db',
  user: 'yahyamo.' // your username here!!
}

var connection = pgInstance(config);

module.exports = connection;