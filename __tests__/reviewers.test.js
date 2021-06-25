import db from '../lib/utils/db.js';
import request from 'supertest';
import app from '../lib/app.js';
import Reviewer from '../lib/models/Reviewer.js';

const reviewer1 = {
  name: 'Judge Judy',
  company: 'The Court of Law'
};

const reviewer2 = {
  name: 'Judge Joe Brown',
  company: 'The Court of Law'
};

describe('Reviewer routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  it('creates a reviewer via POST', async () => {
    const res = await request(app)
      .post('/api/v1/reviewers')
      .send(reviewer1);

    expect(res.body).toEqual({
      id: 1,
      ...reviewer1,
      createdAt: expect.any(String),
      updatedAt: expect.any(String)
    });
  });

  it('get all reviewers via GET', async () => {
    await Reviewer.create(reviewer1);
    await Reviewer.create(reviewer2);

    const expected = [{
      id: 1,
      ...reviewer1
    },
    {
      id: 2,
      ...reviewer2
    }];

    const res = await request(app)
      .get('/api/v1/reviewers');

    expect(res.body).toEqual(expected);
  });

  it('gets reviewers by id via a GET route', async () => {
    const reviewer = await Reviewer.create(reviewer1);

    const res = await request(app)
      .get(`/api/v1/reviewers/${reviewer.id}`);

    expect(res.body).toEqual({
      ...reviewer.toJSON(),
      updatedAt: reviewer.updatedAt.toISOString(),
      createdAt: reviewer.createdAt.toISOString()
    });
  });

});

