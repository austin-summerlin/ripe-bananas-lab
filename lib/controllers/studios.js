import { Router } from 'express';
import Studio from '../models/Studio.js';

export default Router()
  .post('/', (req, res, next) => {
    Studio.create(req.body)
      .then(studio => res.send(studio))
      .catch(next);
  })
  
  .get('/:id', (req, res, next) => {
    Studio.findByPk(req.params.id)
      .then(studio => res.send(studio))
      .catch(next);  
  })
  
  .get('/', (req, res, next) => {
    Studio.findAll()
      .then(studios => res.send(studios.map(studio => {
        return {
          id: studio.id,
          name: studio.name
        };
      })))
      .catch(next);
  })
  
  
  
  
  
;


