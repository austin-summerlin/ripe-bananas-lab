import { Router } from 'express';
import Reviewer from '../models/Reviewer.js';

export default Router()
  .post('/', (req, res, next) => {
    Reviewer.create(req.body)
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Reviewer.findAll()
      .then(reviewers => res.send(reviewers.map(reviewer => {
        return {
          id: reviewer.id,
          name: reviewer.name,
          company: reviewer.company
        };
      })))
      .catch(next);
  })

;

