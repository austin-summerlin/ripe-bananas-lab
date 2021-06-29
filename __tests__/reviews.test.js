import db from '../lib/utils/db.js';
import request from 'supertest';
import app from '../lib/app.js';
import Review from '../lib/models/Review.js';
import Reviewer from '../lib/models/Reviewer.js';

const review1 = {
  rating: 5,
  // reviewer: 1,
  review: 'great film.',
  // film: 1
};

const review2 = {
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
    const res = await request(app)
      .post('/api/v1/reviews')
      .send(review1);

    expect(res.body).toEqual({
      id: 1,
      rating: 5,
      review: 'great film.',
      film: null,
      reviewer: null,
      createdAt: expect.any(String),
      updatedAt: expect.any(String)
    });
  });

  it('get all reviews via GET', async () => {
    await Review.create(review1);
    await Review.create(review2);

    const expected = [
      {
        id: 1,
        rating: 5,
        review: 'great film.',
      // film: 1 {
        //   id: ,
        //   title: 
        // }
      },
      {
        id: 2,
        rating: 5,
        review: 'great film.',
        // film: {
        //   id: ,
        //   title: 
        // }
      }
    ];

    const res = await request(app)
      .get('/api/v1/reviews');

    expect(res.body).toEqual(expected);
  });

  it('deletes a review using DELETE', async () => {
    const review = await Review.create({
      rating: 5,
      // reviewer: 1,
      review: 'great film.',
      // film: 1
    });

    const res = await request(app)
      .delete(`/api/v1/review/${review.id}`)
      .send(review);

    expect(res.body).not.toEqual(review);
  });
});
