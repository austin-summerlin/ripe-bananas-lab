import db from '../lib/utils/db.js';

import request from 'supertest';
import app from '../lib/app.js';
import Studio from '../lib/models/Studio.js';


let taStation = {
  name: 'TA Station',
  city: 'Portland',
  state: 'Oregon',
  country: 'US'
}

describe('demo routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  it('creates a studio via POST', async () => {
    const res = await request(app)
      .post('/api/v1/studios')
      .send(taStation);

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

  it('get a studio by id via GET', async () => {
    const studio = await Studio.create({
      name: 'TA Station',
      city: 'Portland',
      state: 'Oregon',
      country: 'US'
    })


  })

});
