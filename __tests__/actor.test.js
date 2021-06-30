import db from '../lib/utils/db.js';
import request from 'supertest';
import app from '../lib/app.js';
import Actor from '../lib/models/Actor.js';

const actor1 = {
  name: 'Bean Benny B',
  dob: '1969-04-20',
  pob: 'Coolzone, USA'
};

const actor2 = {
  name: 'Tony Bologna',
  dob: '1904-03-11',
  pob: 'Brooklyn, USA'
};

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
      dob: '1969-04-20T00:00:00.000Z',
      pob: 'Coolzone, USA',
      updatedAt: expect.any(String),
      createdAt: expect.any(String)
    });


  });

  it('get all actors via GET', async () => {
    await Actor.create(actor1);
    await Actor.create(actor2);

    const expected = [{ id: 1, name: actor1.name }, { id: 2, name: actor2.name }];

    const res = await request(app)
      .get('/api/v1/actors');
    expect(res.body).toEqual(expected);
  });

  it('get an actor via GET', async () => {
    const actor = await Actor.create(actor1);

    const res = await request(app)
      .get(`/api/v1/actors/${actor.id}`);

    expect(res.body).toEqual({
      ...actor.toJSON(),
      dob: actor.dob.toISOString(),
      updatedAt: actor.updatedAt.toISOString(),
      createdAt: actor.createdAt.toISOString()
    });
  });

});

