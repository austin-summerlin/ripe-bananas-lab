import { Router } from 'express';
import Review from '../models/Review.js';

export default Router()
  .post('/', (req, res, next) => {
    Review.create(req.body)
      .then(review => res.send(review))
      .catch(next);
  });
