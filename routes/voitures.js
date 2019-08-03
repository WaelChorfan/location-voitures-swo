var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection =require('../db').database;

/* GET users listing. */
router.get('/',  function (req, res) {
    connection.query('SELECT * FROM voiture', function (error, result) {
      console.log(__dirname);
      res.render('voitures', { msg: 'voiture', voiture: result, long: result.length });
    });

  }
)

router.get('/list',  function (req, res) {
  connection.query('SELECT * FROM voiture', function (error, result) {
    console.log(__dirname);
    res.send(result);
  });

}
)


router.post('/search',
  function (req, res) {
console.log(req.body.searchText);
    var q = "SELECT * FROM voiture where " +
      "matricule like '%" + req.body.searchText + "%' or " +
      "marque like '%" + req.body.searchText + "%' or " +
      "couleur like '%" + req.body.searchText + "%' or " +
      "prixNjour like '%" + req.body.searchText + "%' or " +
      "prixEjour like '%" + req.body.searchText + "%'"

    console.log(q);
    console.log("pppppp");


    connection.query(q, function (error, result) {
      console.log(__dirname);
  
       res.render('voitures', {
        msg: 'voiture, result(s) of search ',
        voiture: result?result:[],
        long: result?result.length:0
      });

    });


  }
)

router.get('/delete/:id',
  function (req, res) {
    connection.query('delete FROM voiture where id= ' + req.params.id, function (error, result) {

      res.redirect('http://localhost:3000/voitures')

    });


  }
)
//upsert = update or insert
router.post('/', (req, res) => {
  var r = req.body;
  let q = ' INSERT INTO voiture(id,matricule, marque, couleur, prixNjour,prixEjour) VALUES (?,?,?,?,?,?)'
    + 'ON DUPLICATE KEY UPDATE '
    + ' matricule= ?,marque= ?,couleur= ? ,prixNjour= ?, prixEjour= ?'

  //respectivement ordonnés comme dans la requete
  let d = [r.id, r.matricule, r.marque, r.couleur, r.prixNjour, r.prixEjour, r.matricule, r.marque, r.couleur, r.prixNjour, r.prixEjour]

  let query = mysql.format(q, d)


  connection.query(query, function (err, result) {
    if (err) throw err;
    //enregistrer c'est ajouter ou modifier
    // res.send('Enregistré avec succes')


 
    res.redirect('http://localhost:3000/voitures')
  })
})


router.post('/delete',
  function (req,res) {
   
    var q= 'delete FROM voiture where id=' +req.body.id;
    console.log(q)
    connection.query( q, function (error, result) {
     
      res.redirect('http://localhost:3000/voitures')
  
    });
      
  }
  )  

module.exports = router;
