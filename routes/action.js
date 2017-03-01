const express = require('express');
const request = require('request');
const router = express.Router();
const User = require('../models/user');

router.put('/', (req, res, next) => {
  let action = req.query.action;
  let hunger = req.session.user.vpets.stats.hunger
  let caremistake = req.session.user.vpets.stats.caremistake
  if(action === "feed") {
    if(hunger <= 4) {
    //fills the hunger up to 4
    req.session.user.vpets.stats.hunger++;
    //increases the weight by 1
    req.session.user.vpets.stats.weight++;

    console.log('ate food', hunger)
    res.send(200)
    } else {
      res.send(201)
    }
  }
  if(action === "feedsubtract") {
    if(hunger > 0){
    req.session.user.vpets.stats.hunger--;
    console.log('hunger decreased', hunger)
    res.send(200)
    } else {
      req.session.user.vpets.stats.caremistake++;
      console.log('care mistake increased', caremistake)
      res.send(200)
    }
  }

  User.update({google_id: req.session.user.id},
    {$set:
      {
        "vpets.0.stats.weight": req.session.user.vpets.stats.weight,
        "vpets.0.stats.hunger": req.session.user.vpets.stats.hunger,
        "vpets.0.stats.caremistake": req.session.user.vpets.stats.caremistake
      }
    },
    function(err, results) {
      if (err) console.log(err);
      else console.log(results)
    })
  res.redirect('/user')
})

module.exports = router;
