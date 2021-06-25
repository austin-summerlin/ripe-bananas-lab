import { Router } from 'express';
import Actor from '../models/Actor.js';

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
  })
  
  .get('/:id', (req, res, next) => {
    Actor.findByPk(req.params.id)
      .then(actor => res.send(actor))
      .catch(next);
  });

