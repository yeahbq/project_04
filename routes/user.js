const express = require('express');
const request = require('request');
const router = express.Router();
const User = require('../models/user');

router.get('/', (req, res, next) => {
  var data = {};
  var newUserFlag = true;
  const user = req.session.user;
  if (!user) return res.redirect('/');
  User.find({google_id: req.session.user.id}, function (err, results) {
  if (err) return console.error('error here', err);
  data = results;
    console.log('data[0]', data[0])
    if (data[0] === undefined) return console.log('no data for this user')
    else {
      req.session.user.vpets = results[0].vpets[0]
      console.log('WRECK MEEEEE req.session.user.vpets', req.session.user.vpets)
      newUserFlag = false;
    }
  }).then(function(){
    if (newUserFlag === true) {
      console.log('NEWBOOFLAGWTFBBQ', newUserFlag)
      return res.redirect('/user/new')
    }
    //if a digimon object doesn't exist with this user, send them to new
    else res.render('user', {vpets: req.session.user.vpets})
  })
})

router.get('/new', (req, res, next) => {
  //run findOneAndUpdate
  const user = req.session.user;
  if (!user) return res.redirect('/');
  console.log('tears reQ.Q.session:', req.session)
  res.render('new')
})

router.post('/new', (req, res, next) => {
let vpets = req.session.user
  req.session.user.vpets = {
  species: "Botamon",
  nickname: req.body.nickname,
  birthday: new Date,
  stats: {
    age: 0,
    weight: 0,
    hunger: 0,
    strength: 0,
    energy: 0,
    caremistake: 0,
    experience: 0,
  }
}
let account = new User ({
  name: req.session.user.displayName,
  google_id: req.session.user.id,
  vpets: req.session.user.vpets
})
    account.save();
    console.log('vpet created!', req.session.user.vpets)
  // .then(function() {
  //   res.redirect('/user')
  // })
  res.redirect('/user');
})

router.post('/edit', (req, res, next) => {
  const user = req.session.user;
  if (!user) return res.redirect('/');

  User.update({google_id: req.session.user.id},
    {$set:
      {
        "vpets.0.nickname": req.body.nickname
      }
    },
    function(err, results) {
      if (err) console.log(err);
      else console.log(results)
    })
  res.redirect('/user')
})

router.delete('/', (req, res, next) => {
  const user = req.session.user;
  if (!user) return res.redirect('/');

  User.findOneAndRemove({google_id: req.session.user.id}, function(err) {
    if (err) throw err;
    console.log('digimon deleted!');
  });
  res.send('deleted')
})

module.exports = router;
