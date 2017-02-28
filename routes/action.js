const express = require('express');
const request = require('request');
const router = express.Router();

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
})

module.exports = router;
