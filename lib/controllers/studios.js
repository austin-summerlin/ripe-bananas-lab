import { Router } from 'express';
import Studio from '../models/Studio.js';

export default Router()
  .post('/', (req, res, next) => {
    Studio.create(req.body)
      .then(studio => res.send(studio))
      .catch(next);
  });

