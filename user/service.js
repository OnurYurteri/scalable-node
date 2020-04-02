const User = require('./model');

const userObj = {
  name: 'Onur',
  surname: 'Yurteri',
};

exports.getUsers = async function getUsers(query, page, limit) {
  try {
    //const users = await User.find(query)
    return userObj;
  } catch (e) {
    // Log Errors
    throw Error('Error while Paginating Users');
  }
};
