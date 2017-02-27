var mongoose = require('mongoose')

var MonsterSchema = new mongoose.Schema({
  name: String,
  nickname: String,
  birthday: Date,
  stats: {
    age: Number,
    weight: Number,
    hunger: Number,
    strength: Number,
    energy: Number,
  }
})

module.exports = mongoose.model('Monster', MonsterSchema)
