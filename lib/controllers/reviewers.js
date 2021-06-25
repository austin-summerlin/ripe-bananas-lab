import { Router } from 'express';
import Reviewer from '../models/Reviewer.js';

export default Router()
  .post('/', (req, res, next) => {
    Reviewer.create(req.body)
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })


;
