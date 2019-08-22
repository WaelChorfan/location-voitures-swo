var express = require('express');
var router = express.Router();
var connection= require('../db').database;
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Agence de location des voitures' });
});

router.get('/catalogue', function (req, res, next) {
  connection.query('SELECT * FROM voiture', function (error, result) {
    console.log(result);
    res.render('catalogue',
      { title: 'Catalogue des Voitures', voiture: result, long: result.length });
  })
})



module.exports = router;
