const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userCollectionName = 'User';
const SALT_FACTOR = 15;

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    pass: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
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
    e.from = 'user_model_preSave';
    throw e;
  }
});

UserSchema.methods.passwordMatches = async function passwordMatches(password) {
  try {
    return bcrypt.compare(password, this.pass);
  } catch (e) {
    e.from = 'user_model_passwordMatches';
    throw e;
  }
};

const User = mongoose.model('User', UserSchema, userCollectionName);

module.exports = User;
