import db from '../lib/utils/db.js';

import request from 'supertest';
import app from '../lib/app.js';

describe('demo routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  it('creates a studio via POST', async () => {
    const res = await request(app)
      .post('/api/v1/studios')
      .send({
        name: 'TA Station',
        city: 'Portland',
        state: 'Oregon',
        country: 'US'
      });

    expect(res.body).toEqual({
      id: 1,
      name: 'TA Station',
      city: 'Portland',
      state: 'Oregon',
      country: 'US',
      updatedAt: expect.any(String),
      createdAt: expect.any(String)
    });
  });

});
