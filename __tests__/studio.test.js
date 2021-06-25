import db from '../lib/utils/db.js';

import request from 'supertest';
import app from '../lib/app.js';
import Studio from '../lib/models/Studio.js';


const taStation = {
  name: 'TA Station',
  city: 'Portland',
  state: 'Oregon',
  country: 'US'
};

const taStation2 = {
  name: 'TA Station 2',
  city: 'Pasadena',
  state: 'California',
  country: 'US'
};

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
    const studio = await Studio.create(taStation);

    const res = await request(app)
      .get(`/api/v1/studios/${studio.id}`);

    expect(res.body).toEqual({
      ...studio.toJSON(),
      updatedAt: expect.any(String),
      createdAt: expect.any(String)
    });
  });

  it('gets all studios via GET', async () => {
    
    await Studio.create(taStation);
    await Studio.create(taStation2);

    const expected = [
      {
        id: 1,
        name: taStation.name
      },
      {
        id: 2,
        name: taStation2.name
      }
    ];

    const res = await request(app)
      .get('/api/v1/studios');
    
    expect(res.body).toEqual(expected);
  });

});
