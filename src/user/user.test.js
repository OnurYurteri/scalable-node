require('dotenv').config();
const mongoose = require('mongoose');
const create = require('./service').create;
const getUserWithEmail = require('./service').getUserWithEmail;
const getUsers = require('./service').getUsers;

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

let testUser;

beforeAll(async () => {
  mongoose.connect(url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    auto_reconnect: true,
  });
});

beforeEach(() => {
  testUser = {
    username: 'test-uname',
    email: 'test-email@a.com',
    pass: 'test-pass',
    name: 'test-name',
    surname: 'test-surname',
  };
});

afterAll(async () => {
  mongoose.connection.close();
});

describe('Service', () => {
  let dropCollection = true;
  afterEach(async () => {
    if (dropCollection) {
      mongoose.connection.collections.User.drop();
    }
    dropCollection = true;
  });

  it('Create user', async () => {
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

  it('Get users', async () => {
    await create(testUser.username, testUser.email, testUser.pass, testUser.name, testUser.surname);
    const users = await getUsers();
    expect(users.length > 0).toBe(true);
  });

  it('Throws error when required is empty', async () => {
    dropCollection = false;
    expect.assertions(1);
    try {
      await create();
    } catch (e) {
      expect(e.from).toBe('user_service_create');
    }
  });

  it('Get user with email', async () => {
    const { id } = await create(
      testUser.username,
      testUser.email,
      testUser.pass,
      testUser.name,
      testUser.surname
    );

    const returnedUser = await getUserWithEmail(testUser.email);
    // eslint-disable-next-line no-underscore-dangle
    expect(returnedUser._id.toString()).toBe(id);
  });
});

describe('Model', () => {
  let mockUser;

  beforeEach(async () => {
    mockUser = await create(
      testUser.username,
      testUser.email,
      testUser.pass,
      testUser.name,
      testUser.surname
    );
  });

  afterEach(async () => {
    mongoose.connection.collections.User.drop();
  });

  it('True when raw password matches with hashed one', async () => {
    const result = await mockUser.passwordMatches(testUser.pass);
    expect(result).toBe(true);
  });

  it('False when raw password doesnt match with hashed one', async () => {
    const result = await mockUser.passwordMatches('X');
    expect(result).toBe(false);
  });

  it('Hash password when pass changed', async () => {
    const updatedPass = 'updated-pass';
    mockUser.pass = updatedPass;
    const updatedUser = await mockUser.save();

    const result = await updatedUser.passwordMatches(updatedPass);
    expect(result).toBe(true);
  }, 10000);

  it('Dont hash password when pass not changed', async () => {
    const updatedName = 'updated-name';
    mockUser.name = updatedName;
    const updatedUser = await mockUser.save();

    expect(updatedUser.name).toBe(updatedName);
    const result = await updatedUser.passwordMatches(testUser.pass);
    expect(result).toBe(true);
  }, 10000);
});
