const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  pass: String,
  name: String,
  surname: String,
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
