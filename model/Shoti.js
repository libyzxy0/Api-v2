const mongoose = require('mongoose')

const ShotiSchema = new mongoose.Schema({
  video: {
    type: String,
    required: [true, 'must provide string'], 
    unique: true, 
  }
})

module.exports = mongoose.model('Shoti', ShotiSchema)
