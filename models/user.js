var mongoose = require('mongoose')
// var Monster = require('../models/Monster')

var MonsterSchema = new mongoose.Schema({
  species: String,
  nickname: String,
  birthday: Date,
  stats: {
    age: Number,
    weight: Number,
    hunger: Number,
    strength: Number,
    energy: Number,
    caremistake: Number,
    experience: Number,
    poop: Number
  }
})


var UserSchema = new mongoose.Schema({
  name: String,
  google_id: String,
  vpets: [MonsterSchema]
})

var User = mongoose.model('User', UserSchema);

module.exports = User;
