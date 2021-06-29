import { Router } from 'express';
import Film from '../models/Film.js';

export default Router()
  .post('/', (req, res, next) => {
    Film.create(req.body)
      .then(film => res.send(film))
      .catch(next);
  })
  
  .get('/', (req, res, next) => {
    Film.findAll()
      .then(films => res.send(films.map(film => {
        return {
          id: film.id,
          title: film.title,
          released: film.released
        };
      })))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Film.findByPk(req.params.id)
      .then(film => res.send(film))
      .catch(next);
  })
  
;