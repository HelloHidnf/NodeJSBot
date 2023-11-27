const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  _id: String,
  prefix: String,
  adminRoles: [ String ],
  memberRole: String,
  botRole: String,
  countingChannel: String,
  logChannel: String,
  noLogChannels: [ String ]
})

module.exports = mongoose.model('Server', schema);