var express = require('express');
var router = express.Router();
const config = require('../config');
const chalk = require('chalk');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(config.databaseName);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/add-post', (req, res, next) => {
	const {title, author, content} = req.body;
	const date = new Date().toISOString();
	const stmt = `INSERT INTO ${config.tableName} (title, date, author, post) VALUES ("${title}", "${date}", "${author}", "${content}")`;
	db.serialize(() => {
		db.run(stmt);
		res.redirect('/');
		console.log(chalk.green('Fuck yeah, d00d!'));
	});
	db.close();
});

module.exports = router;
