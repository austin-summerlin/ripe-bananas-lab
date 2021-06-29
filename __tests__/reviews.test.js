import db from '../lib/utils/db.js';
import request from 'supertest';
import app from '../lib/app.js';
import Review from '../lib/models/Review.js';

const review1 = {
  rating: 5,
  // reviewer: 1,
  review: 'great film.',
  // film: 1
};

describe('Review routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  it('creates a review using POST', async () => {
    await Review.create(review1);
    const res = await request(app)
      .post('/api/v1/reviews')
      .send(review1);

    expect(res.body).toEqual({
      id: 1,
      rating: 5,
      review: 'great film.',
      createdAt: expect.any(String),
      updatedAt: expect.any(String)
    });
  });


});
