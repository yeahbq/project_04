const express = require('express');
const request = require('request');
const router = express.Router();
const User = require('../models/user');

router.get('/', (req, res, next) => {
  User.find({}, function (err, results) {
  if (err) return console.error(err);
  res.json(results)
  })
})

router.get('/user', (req, res, next) => {
  const user = req.session.user;
  if (!user) return res.redirect('/');
  let data = {}
  User.find({google_id: req.session.user.id}, function (err, results) {
  if (err) return console.error(err);
  console.log(results);
  data = results;
  res.json(results)
  })

})

module.exports = router;
