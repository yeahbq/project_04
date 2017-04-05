var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST

var User = require('../models/user');
var userController = require('../controllers/user');


//look up syntax to handle req.query

router.route('/api')
.get(function(req, res, next) {
  User.find({}, function(err, results) {
    if(err) return console.error(err);
    res.json(results)
  })
})

router.route('/api/user')
.get(function (req, res, next) {
  const user = req.session.user;
  if (!user) return res.redirect('/');
  let data = {}
  User.find({google_id: req.session.user.id}, function (err, results) {
  if (err) return console.error(err);
  // console.log(results);
  data = results;
  res.json(results)
  })
})

router.route('/user')

//GET show user page
.get(userController.getUser)
//PUT to edit digimons name
.put(userController.updateNickname)
//DELETE to delete digimon
.delete(userController.deleteMonster)

router.route('/user/new')
//GET shows form to create new monster
.get(function (req, res, next) {
  //run findOneAndUpdate
  var user = req.session.user;
  if (!user) return res.redirect('/');
  // console.log('req.session:', req.session)
  res.render('new')
})

//POST sends info to create new monster
.post(userController.newMonster)

module.exports = router
