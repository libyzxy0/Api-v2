const mongoose = require('mongoose')

const SimsimiSchema = new mongoose.Schema({
  message: {
    type: String,
    required: [true, 'must provide string'], 
  },
  reply: {
    type: String,
    required: [true, 'must provide string'], 
  },
})

module.exports = mongoose.model('Simsimi', SimsimiSchema)
