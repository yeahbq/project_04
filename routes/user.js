const express = require('express');
const request = require('request');
const router = express.Router();
const User = require('../models/user');

router.get('/', (req, res, next) => {
  const user = req.session.user;
  if (!user) return res.redirect('/');
  else if (!req.session.user.vpets) return res.redirect('/user/new')
  //if a digimon object doesn't exist with this user, send them to new
  res.render('user', {vpet: req.session.user.vpets})
})

router.get('/new', (req, res, next) => {
  //run findOneAndUpdate
  const user = req.session.user;
  if (!user) return res.redirect('/');
  console.log('req.session:', req.session)
  res.render('new')
})

router.post('/new', (req, res, next) => {
let vpets = req.session.user
  req.session.user.vpets = {
  name: "",
  nickname: req.body.nickname,
  birthday: new Date,
  stats: {
    age: 0,
    weight: 0,
    hunger: 0,
    strength: 0,
    energy: 0,
    missedcalls: 0,
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
  res.redirect('/user')
})

module.exports = router;
