import { Router } from 'express';
import Actor from '../models/Actor.js';
import Studio from '../models/Studio.js';

export default Router()
  .post('/', (req, res, next) => {
    Actor.create(req.body)
      .then(actor => res.send(actor))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Actor.findAll()
      .then(actors => res.send(actors.map(actor => {
        return {
          id: actor.id,
          name: actor.name
        };
      })))
      .catch(next);
  });

