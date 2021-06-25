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

});
