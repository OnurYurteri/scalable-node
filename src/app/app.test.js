require('dotenv').config();
const createToken = require('./service').createToken;
const verifyTokenMiddleware = require('./service').verifyTokenMiddleware;

let mockUser = {};

beforeEach(() => {
  mockUser = {
    _id: '5ea4a3296e0ca61b806e92f0',
    username: 'test-uname',
    email: 'test-email@a.com',
    pass: '$2b$15$G1copsc2SEDhbvVXOy0hbemO0CFF4j3sAgIPi3MDhR8kCjyxaSnsm',
    name: 'test-name',
    surname: 'test-surname',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    __v: 0,
  };
});

describe('Service', () => {
  it('Create token', async () => {
    const jwtToken = await createToken(mockUser);
    expect(jwtToken).not.toBeUndefined();
    expect(jwtToken).not.toBeNull();
  });

  it('Middleware verifies token', async () => {
    const jwtToken = await createToken(mockUser);
    const req = {
      headers: {
        'x-api-token': jwtToken,
      },
    };

    await verifyTokenMiddleware(req, null, () => {
      const exprsInSec = parseInt(process.env.JWT_TOKEN_EXPR_SEC, 10) || 30;
      expect(req.user.exp - req.user.iat === exprsInSec).toBe(true);
      delete req.user.exp;
      delete req.user.iat;
      delete mockUser.pass;
      expect(req.user).toEqual(mockUser);
    });
  });

  it('Rejects request when token not given', async () => {
    const req = {
      headers: {},
    };
    const res = {
      status: 200,
      sendStatus: function sendStatus(set) {
        this.status = set;
      },
    };
    await verifyTokenMiddleware(req, res, null);
    expect(res.status).toBe(403);
  });

  it('Rejects request when token is not valid', async () => {
    const req = {
      headers: {
        'x-api-token': 'X',
      },
    };
    const res = {
      status: 200,
      sendStatus: function sendStatus(set) {
        this.status = set;
      },
    };
    await verifyTokenMiddleware(req, res, null);
    expect(res.status).toBe(401);
  });
});
