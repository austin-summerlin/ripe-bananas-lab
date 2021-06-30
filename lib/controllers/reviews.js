import { Router } from 'express';
import Review from '../models/Review.js';

export default Router()
  .post('/', (req, res, next) => {
    Review.create(req.body)
      .then(review => res.send(review))
      .catch(next);
  })
  
  .get('/', (req, res, next) => {
    Review.findAll()
      .then(reviews => res.send(reviews.map(review => {
        return {
          id: review.id,
          rating: review.rating,
          review: review.review,
          // film: {
          //   id: review.film.id,
          //   title: review.film.title
          // }
        };
      })))
      .catch(next);
  })
  
  .delete('/:id', (req, res, next) => {
    Review.destroy({
      where: { id: req.params.id }
    })
      .then(([, review]) => res.send(review[0]))
      .catch(next);
  });
