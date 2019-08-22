var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const multer = require('multer');
var moment = require('moment');



// multer's storage strategy 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/')
  },
  filename: function (req, file, cb) {
    var newDate = new Date().toLocaleString().replace(/:/g, '-').replace(/,/g, '-')
    .replace(/ /g, '').replace("/", ".").replace("/", ".").replace("/", ".")

    cb(null, moment().format('YYYY-MM-DD-h-mm-ss-') + file.originalname)
  }
})

const upload = multer({ storage: storage })

var connection = require('../db').database;

/* GET users listing. */
router.get('/', function (req, res) {
  connection.query('SELECT * FROM voiture', function (error, result) {
    console.log(result);
    console.log(__dirname);
    res.render('voitures', { msg: 'Gestion des Voitures', voiture: result, long: result.length });
  });

}
)

router.get('/list', function (req, res) {
  connection.query('SELECT * FROM voiture ', function (error, result) {
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
      "prix like '%" + req.body.searchText + "%' "

    console.log(q);

    connection.query(q, function (error, result) {
      console.log(__dirname);

      res.render('voitures', {
        msg: 'voiture, result(s) of search ',
        voiture: result ? result : [],
        long: result ? result.length : 0
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
router.post('/', upload.single('image'), (req, res) => {


  var r = req.body;
  console.log(r);
  var image=null
  if(req.file){ image=req.file.filename }
    
  var idVal= r.id?r.id:'0'
  let q = ' INSERT INTO voiture(id,matricule, marque, couleur, prix, image) VALUES (?,?,?,?,?,?)'
    + 'ON DUPLICATE KEY UPDATE '
    + ' matricule= ?,marque= ?,couleur= ? ,prix= ?,image=?'

  //respectivement ordonnés comme dans la requete
  let d = [idVal,r.matricule, r.marque, r.couleur, r.prix,image
    , r.matricule, r.marque, r.couleur, r.prix,image]

  let query = mysql.format(q, d)

  console.log(query);

  connection.query(query, function (err, result) {
    if (err) throw err;
    //enregistrer c'est ajouter ou modifier
    // res.send('Enregistré avec succes')



    res.redirect('http://localhost:3000/voitures')
  })
})


router.post('/delete',
  function (req, res) {

    var q = 'delete FROM voiture where id=' + req.body.id;
    console.log(q)
    connection.query(q, function (error, result) {

      res.redirect('http://localhost:3000/voitures')

    });

  }
)

module.exports = router;
