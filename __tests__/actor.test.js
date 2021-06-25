import db from '../lib/utils/db.js';
import request from 'supertest';
import app from '../lib/app.js';
import Actor from '../lib/models/Actor.js';

describe('Actor routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  it('creates an actor via POST', async () => {
    const res = await request(app)
      .post('/api/v1/actors')
      .send({
        name: 'Bean Benny B',
        dob: '1969-04-20',
        pob: 'Coolzone, USA',
      });

    expect(res.body).toEqual({
      id: 1,
      name: 'Bean Benny B',
      dob: '1969-04-20',
      pob: 'Coolzone, USA',
      updatedAt: expect.any(String),
      createdAt: expect.any(String)
    });
    

  });

});
