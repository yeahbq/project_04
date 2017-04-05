//require model here
var User = require('../models/user');

function getUser (req, res) {
  var data = {};
  var newUserFlag = true;

const user = req.session.user;
  if (!user) return res.redirect('/');
  User.find({google_id: req.session.user.id}, function (err, results) {
  if (err) return console.error('error here', err);
  data = results;
    if (data[0] === undefined) return;
    else {
      req.session.user.vpets = results[0].vpets[0]
      newUserFlag = false;
    }
  }).then(function(){
    if (newUserFlag === true) {
      return res.redirect('/user/new')
    }
    //if a digimon object doesn't exist with this user, send them to new
    else res.render('user', {vpets: req.session.user.vpets})
  })
}

function updateNickname(req, res) {
  const user = req.session.user;
  if (!user) return res.redirect('/');

  User.update({google_id: req.session.user.id},
    {$set:
      {
        "vpets.0.nickname": req.body.vpets.nickname
      }
    },
    function(err, results) {
      if (err) console.log(err);
      else console.log(results)
    })
  res.json('nickname udated')
}

function newMonster (req, res) {
  var acct = new User ({
      name: req.session.user.displayName,
      google_id: req.session.user.id,
      vpets: {
        species: "Botamon",
        nickname: req.body.vpets.nickname,
        birthday: new Date,
        stats: {
          age: 0,
          weight: 0,
          hunger: 0,
          strength: 0,
          energy: 0,
          caremistake: 0,
          experience: 0,
          poop: 0
        }
      }
    })
  acct.save();
  res.redirect('/user')
}

function deleteMonster (req, res, next) {
  const user = req.session.user;
  if (!user) return res.redirect('/');

  User.findOneAndRemove({google_id: req.session.user.id}, function(err) {
    if (err) throw err;
    console.log('digimon deleted!');
  });
  res.send('deleted')
}

//export functions here
module.exports = {
  getUser: getUser,
  newMonster: newMonster,
  updateNickname: updateNickname,
  deleteMonster: deleteMonster
}
