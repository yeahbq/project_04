const express = require('express');
const request = require('request');
const router = express.Router();
const User = require('../models/user');

router.put('/', (req, res, next) => {
  let action = req.query.action;
  let hunger = req.session.user.vpets.stats.hunger
  let strength = req.session.user.vpets.stats.strength
  let caremistake = req.session.user.vpets.stats.caremistake

  if(action === "strength") {
    if(strength <= 4) {
      req.session.user.vpets.stats.strength++;
      req.session.user.vpets.stats.weight += 2;

      User.update({google_id: req.session.user.id},
      {$set:
        {
          "vpets.0.stats.weight": req.session.user.vpets.stats.weight,
          "vpets.0.stats.strength": req.session.user.vpets.stats.strength,
        }
      },
      function(err, results) {
        if (err) console.log(err);
        else console.log(results)
      })
    // console.log('ate protein', strength)
    res.send(200)
    } else {
      res.send(201)
    }
  }

  if(action === "feed") {
    if(hunger <= 4) {
    //fills the hunger up to 4
    req.session.user.vpets.stats.hunger++;
    //increases the weight by 1
    req.session.user.vpets.stats.weight++;

    User.update({google_id: req.session.user.id},
    {$set:
      {
        "vpets.0.stats.weight": req.session.user.vpets.stats.weight,
        "vpets.0.stats.hunger": req.session.user.vpets.stats.hunger,
      }
    },
    function(err, results) {
      if (err) console.log(err);
      else console.log(results)
    })

    if(req.session.user.vpets.stats.weight > 20) {
      User.update({google_id: req.session.user.id},
      {$set:
        {
          "vpets.0.species": "monzaemon",
        }
      },
      function(err, results) {
        if (err) console.log(err);
        else console.log(results)
      })
    }

    else if(req.session.user.vpets.stats.weight > 10) {
      User.update({google_id: req.session.user.id},
      {$set:
        {
          "vpets.0.species": "koromon",
        }
      },
      function(err, results) {
        if (err) console.log(err);
        else console.log(results)
      })
    }

    // console.log('ate food', hunger)
    res.send(200)
    } else {
      res.send(201)
    }
  }

  if(action === "feedsubtract") {
    if(hunger > 0){
    req.session.user.vpets.stats.hunger--;
    User.update({google_id: req.session.user.id},
    {$set:
      {
        "vpets.0.stats.hunger": req.session.user.vpets.stats.hunger
      }
    },
    function(err, results) {
      if (err) console.log(err);
      else console.log(results)
    })
    // console.log('hunger decreased', hunger)
    res.send(200)
    } else {
      req.session.user.vpets.stats.caremistake++;
      User.update({google_id: req.session.user.id},
      {$set:
        {
          "vpets.0.stats.caremistake": req.session.user.vpets.stats.caremistake
        }
      },
      function(err, results) {
        if (err) console.log(err);
        else console.log(results)
      })
      // console.log('care mistake increased', caremistake)
      res.send(200)
    }
  }
  if(action === "strengthsubtract") {
      if(hunger > 0){
      req.session.user.vpets.stats.strength--;
      req.session.user.vpets.stats.poop++;
      User.update({google_id: req.session.user.id},
      {$set:
        {
          "vpets.0.stats.strength": req.session.user.vpets.stats.strength,
          "vpets.0.stats.poop": req.session.user.vpets.stats.poop
        }
      },
      function(err, results) {
        if (err) console.log(err);
        else console.log(results)
      })
      // console.log('strength decreased', strength)
      res.send(200)
      } else {
        req.session.user.vpets.stats.caremistake++;
        User.update({google_id: req.session.user.id},
        {$set:
          {
            "vpets.0.stats.caremistake": req.session.user.vpets.stats.caremistake
          }
        },
        function(err, results) {
          if (err) console.log(err);
          else console.log(results)
        })
        // console.log('care mistake increased', caremistake)
        res.send(200)
      }
    }

  if (action === "toilet") {
    req.session.user.vpets.stats.poop = 0;
    User.update({google_id: req.session.user.id},
    {$set:
      {
        "vpets.0.stats.poop": req.session.user.vpets.stats.poop,
      }
    },
    function(err, results) {
      if (err) console.log(err);
      else console.log(results)
    })
    // console.log('ate food', hunger)
    res.send(200)
  }
})

module.exports = router;
