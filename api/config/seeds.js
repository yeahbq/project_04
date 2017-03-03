var mongoose = require('./database');

var User = require('../models/user');

var user = [
{"name":"Barrett Quan","google_id":"101859305566468610956","__v":0,"vpets":[{"species":"monzaemon","nickname":"THIS IS A TEST","birthday":"2017-03-03T00:31:31.448Z","_id":"58b8b9634dac4a588ea2c5b8","stats":{"age":0,"weight":31,"hunger":5,"strength":5,"energy":0,"caremistake":0,"experience":0,"poop":0}}]}
];

User.remove({}, function(err) {
  if (err) console.log(err);
  User.create(user, function(err, user) {
    if (err) {
      console.log(err);
    } else {
      console.log("Database seeded with " + user.length  + " user.");
      mongoose.connection.close();
    }
    process.exit();
  });
});
