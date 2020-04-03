const User = require('./model');

const userObj = new User({
  username: 'onuryurteri',
  email: 'yurterionur@gmail.com',
  pass: 'passw0rd',
  name: 'Onur',
  surname: 'Yurteri',
});

// eslint-disable-next-line no-unused-vars
exports.getUsers = async (query, page, limit) => {
  try {
    // const users = await User.find(query)
    return userObj;
  } catch (e) {
    // Log Errors
    throw Error('Error while Paginating Users');
  }
};
