require('dotenv').config();
const mongoose = require('mongoose');
const create = require('./service').create;

const testDatabase = 'scalable-test-user';

function getMongoUrl() {
  const { MONGO_INITDB_ROOT_USERNAME, MONGO_INITDB_ROOT_PASSWORD, MONGO_PORT } = process.env;

  let { MONGO_HOSTNAME } = process.env;

  /* Variable 'INSTANCE' is set by docker-compose
      IF exist: MONGO_HOSTNAME will be connected, set MONGO_HOSTNAME to name of your mongo 'service' in docker-compose.yml
      IF NOT exist: We're not running with docker-compose or we're on development, set mongo MONGO_HOSTNAME_STANDALONE to 127.0.0.1 or wherever you want it to connect
      You can start your local mongo with docker using same volume, check: .mongo/start-local-mongo.sh.example
    */

  if (!process.env.INSTANCE) {
    MONGO_HOSTNAME = process.env.MONGO_HOSTNAME_STANDALONE;
  }
  return `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${testDatabase}?authSource=admin`;
}

const url = getMongoUrl();

beforeAll(async () => {
  mongoose.connect(url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    auto_reconnect: true,
  });
});

afterEach(async () => {
  mongoose.connection.collections.User.drop();
});

afterAll(async () => {
  mongoose.connection.close();
});

describe('Service', () => {
  it('Create user', async () => {
    const testUser = {
      username: 'test-uname',
      email: 'test-email@a.com',
      pass: 'test-pass',
      name: 'test-name',
      surname: 'test-surname',
    };
    const returnedUser = await create(
      testUser.username,
      testUser.email,
      testUser.pass,
      testUser.name,
      testUser.surname
    );

    expect('_id' in returnedUser).toBe(true);
    expect(returnedUser.username).toBe(testUser.username);
    expect(returnedUser.email).toBe(testUser.email);
    expect(returnedUser.pass).not.toBeNull();
    expect(returnedUser.pass).not.toBeUndefined();
    expect(returnedUser.pass).not.toBe(testUser.pass);
    expect(returnedUser.name).toBe(testUser.name);
    expect(returnedUser.surname).toBe(testUser.surname);
  });
});
