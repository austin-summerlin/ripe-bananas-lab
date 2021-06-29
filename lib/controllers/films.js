import { Router } from 'express';
import Film from '../models/Film.js';

export default Router()
  .post('/', (req, res, next) => {
    Film.create(req.body)
      .then(film => res.send(film))
      .catch(next);
  });
