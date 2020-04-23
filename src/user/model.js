const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userCollectionName = 'User';
const SALT_FACTOR = 15;

const UserSchema = new mongoose.Schema(
  {
    username: String,
    email: { type: String, unique: true },
    pass: String,
    name: String,
    surname: String,
  },
  { timestamps: true }
);

UserSchema.pre('save', async function save(next) {
  try {
    const user = this;

    if (!user.isModified('pass')) return next();

    const salt = await bcrypt.genSalt(SALT_FACTOR);
    const hash = await bcrypt.hash(user.pass, salt);
    user.pass = hash;

    return next();
  } catch (e) {
    throw e;
  }
});

UserSchema.methods.passwordMatches = async function passwordMatches(password) {
  return bcrypt.compare(password, this.pass);
};

const User = mongoose.model('User', UserSchema, userCollectionName);

module.exports = User;
