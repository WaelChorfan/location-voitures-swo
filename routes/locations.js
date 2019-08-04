var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = require('../db').database;

var qLocations = " SELECT "
  + " location.id,location.datedeb,location.datefin,location.caution,location.prixtotal," +
  "client.id as idClient ,voiture.id as idVoiture , "
  + " voiture.matricule, " +
  "CONCAT(prenom ,' ',nom) as nomClient ,client.cin " +
  " FROM location    INNER JOIN voiture INNER JOIN client " +
  " ON ( location.idc =client.id  AND location.idv= voiture.id) "
var qVoitures = "select id , matricule from voiture"
var qClients = "select id , cin ,  CONCAT(prenom ,' ',nom) as nomClient from client"



router.get('/', async function (req, res) {

  var listLocations = await connection.query(qLocations)
  var listVoitures = await connection.query(qVoitures)
  var listClients = await connection.query(qClients)

  // listVoitures , listClients 
  res.render('locations', {
    location: listLocations,
    long: listLocations.length,
    voits: listVoitures,
    clts: listClients
  })

})

router.get('/list', async function (req, res) {

  var listLocations = await connection.query(qLocations)
  var listVoitures = await connection.query(qVoitures)
  var listClients = await connection.query(qClients)

  res.send({
    "locs": listLocations,
    "voit": listVoitures,
    "client": listClients
  })
})


router.post('/search',
  async  function (req, res) {
    console.log(req.body.searchText);
    var qS = qLocations + " where " +
      " voiture.matricule like '%" + req.body.searchText + "%' or " +
      " client.cin like '%" + req.body.searchText + "%' or " +
      " client.nom like '%" + req.body.searchText + "%' or " +
      " client.prenom like '%" + req.body.searchText+ "%'"
    console.log(qS);


    var listLocations = await connection.query(qS)
    var listVoitures = await connection.query(qVoitures)
    var listClients = await connection.query(qClients)
  
    // listVoitures , listClients 
    res.render('locations', {
      location: listLocations,
      long: listLocations.length,
      voits: listVoitures,
      clts: listClients
    })


  })

router.post('/delete',
  function (req, res) {
    connection.query('delete FROM location where id= ' + req.body.id, function (error, result) {
      res.redirect('http://localhost:3000/locations')
    })
  })


//upsert = update or insert
router.post('/', (req, res) => {

  var r = req.body;
  var idVal = r.id ? r.id : 0

  let q = ' INSERT INTO location(id, datedeb, datefin, caution , prixtotal, idc, idv) ' +
    ' values( ?, ? ,? ,? ,? ,?, ?) '
    + ' ON DUPLICATE KEY UPDATE '
    + '  datedeb=? , datefin=? , caution=? , prixtotal=?, idc=?, idv=? '

  //respectivement ordonnés comme dans la requete

  let d =
    [idVal, r.datedeb, r.datefin, r.caution, r.prixtotal, r.idClient, r.idVoiture
      , r.datedeb, r.datefin, r.caution, r.prixtotal, r.idClient, r.idVoiture]

  let query = mysql.format(q, d)

  console.log(r);
  console.log(query);

  connection.query(query, function (err, result) {
    if (err) throw err;
    //enregistrer c'est ajouter ou modifier
    // res.send('Enregistré avec succes')

    res.redirect('http://localhost:3000/locations')
  })
})




module.exports = router;
