var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection =require('../db').database;




router.get('/',
  function (req, res) {
    connection.query('SELECT * FROM client ', function (error, result) {
      console.log(__dirname);
      res.render('clients', { msg: 'client', client: result, long: result.length });

    });


  }
)

router.post('/search',
  function (req, res) {

    var q = "SELECT * FROM client where " +
      "nom like '%" + req.body.searchText + "%' or " +
      "prenom like '%" + req.body.searchText + "%' or " +
      "tel like '%" + req.body.searchText + "%' or " +
      "solde like '%" + req.body.searchText + "%'"

    console.log(q);
    console.log("pppppp");


    connection.query(q, function (error, result) {
      console.log(__dirname);
      res.render('clients', {
        msg: 'client , result(s) of search ',
        client: result?result:[],
        long: result?result.length:0
      });

    });


  }
)

router.get('/delete/:id',
  function (req, res) {
    connection.query('delete FROM client where id= ' + req.params.id, function (error, result) {
      res.redirect('http://localhost:3000/clients')

    });


  }
)
//upsert = update or insert
router.post('/', (req, res) => {
  var r = req.body;
  let q = ' INSERT INTO client (id, nom, prenom, tel,solde)   VALUES (?,?,?,?,?)'
    + 'ON DUPLICATE KEY UPDATE '
    + ' nom= ?,prenom= ?,tel= ?,solde= ?'



var idVal =r.id?r.id:0

    console.log(r);
  //respectivement ordonnés comme dans la requete
  let d = [, r.nom, r.prenom, r.tel,r.solde , r.nom, r.prenom, r.tel,r.solde ]

  let query = mysql.format(q, d)


  connection.query(query, function (err, result) {
    if (err) throw err;
    //enregistrer c'est ajouter ou modifier
    // res.send('Enregistré avec succes')


    res.redirect('http://localhost:3000/clients')
  })
})



router.post('/delete',
  function (req, res) {

    var q = 'delete FROM client where id=' + req.body.id;
    console.log(q)
    connection.query(q, function (error, result) {
      res.redirect('http://localhost:3000/clients')
    });

  }
)




module.exports = router;
