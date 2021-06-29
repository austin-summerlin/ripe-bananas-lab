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
    return db.sync({ force: true });
  });

  it('creates a film via POST', async () => {
    const studio = await Studio.create(taStation);
    const res = await request(app)
      .post('/api/v1/films')
      .send({ ...film1, StudioId: studio.id });

    expect(res.body).toEqual({
      id: 1,
      ...film1,
      StudioId: 1,
      updatedAt: expect.any(String),
      createdAt: expect.any(String)
    });
  });

  it.only('gets all films via GET', async () => {
    const studio = await Studio.create(taStation);
    await Film.create({
      title: 'Revenge of the Beans',
      released: 2021,
      StudioId: 1
    });
    await Film.create({
      title: 'Revenge of the Beans 2: Electric Boogaloo',
      released: 2022,
      StudioId: 1
    });

    const res = await request(app)
      .get('/api/v1/films');

    const expected = [
      {
        id: 1,
        title: 'Revenge of the Beans',
        released: 2021,
        StudioId: studio.id,
        Studio:
        {
          id: studio.id,
          name: studio.name
        },
        updatedAt: expect.any(String),
        createdAt: expect.any(String)
      },
      {
        id: 2,
        title: 'Revenge of the Beans 2: Electric Boogaloo',
        released: 2022,
        StudioId: studio.id,
        Studio:
        {
          id: studio.id,
          name: studio.name
        },
        updatedAt: expect.any(String),
        createdAt: expect.any(String)
      }
    ];

    expect(res.body).toEqual(expected);
  });

  it('gets a films by ID using GET', async () => {
    await Film.create(film1);

    const res = await request(app)
      .get('/api/v1/films/1');

    const expected = {
      id: 1,
      title: 'Revenge of the Beans',
      released: 2021,
      studio: 1,
      createdAt: expect.any(String),
      updatedAt: expect.any(String)
    };

    expect(res.body).toEqual(expected);

  });
});

