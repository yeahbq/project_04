var mongoose = require('mongoose')

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
    experience: Number
  }
})

let Monster = mongoose.model('Monster', MonsterSchema)


module.exports = Monster
