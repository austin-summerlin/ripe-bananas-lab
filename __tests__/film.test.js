import db from '../lib/utils/db.js';
import request from 'supertest';
import app from '../lib/app.js';
import Film from '../lib/models/Film.js';

const film1 = {
  title: 'Revenge of the Beans',
  studio: 1,
  released: 2021
};

describe('Film routes', () => {
  beforeEach(() => {
    return db.sync({ force:true });
  });

  it('creates an actor via POST', async () => {
    const res = await request(app)
      .post('/api/v1/films')
      .send(film1);

    expect(res.body).toEqual({
      id: 1,
      ...film1,
      updatedAt: expect.any(String),
      createdAt: expect.any(String)
    });
  });

});

