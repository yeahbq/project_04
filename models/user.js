var mongoose = require('mongoose')
var monsterSchema = require('./Monster.js')

var UserSchema = new mongoose.Schema({
  name: String,
  google: String,
  vpets: [monsterSchema]
})

module.exports = mongoose.model('User', UserSchema)
