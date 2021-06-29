import db from '../lib/utils/db.js';
import request from 'supertest';
import app from '../lib/app.js';
import Film from '../lib/models/Film.js';
import Studio from '../lib/models/Studio.js';

const film1 = {
  title: 'Revenge of the Beans',
  studio: 1,
  released: 2021
};

const film2 = {
  title: 'Revenge of the Beans 2: Electric Boogaloo',
  studio: 1,
  released: 2022
};

const taStation = {
  name: 'TA Station',
  city: 'Portland',
  state: 'Oregon',
  country: 'US'
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

  it('gets all films via GET', async () => {
    await Studio.create(taStation);
    await Film.create(film1);
    await Film.create(film2);

    const res = await request(app)
      .get('/api/v1/films');

    const expected = [
      {
        id: 1,
        title: 'Revenge of the Beans',
        released: 2021,
        studio: {
          id: 1,
          name: 'TA Station'
        }
      },
      {
        id: 2,
        title: 'Revenge of the Beans 2: Electric Boogaloo',
        released: 2022,
        studio: {
          id: 1,
          name: 'TA Station'
        }
      }
    ];

    expect(res.body).toEqual(expected);

  });

});

