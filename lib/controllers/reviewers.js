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

  .get('/:id', (req, res, next) => {
    Reviewer.findByPk(req.params.id)
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })

  .put('/:id', (req, res, next) => {
    Reviewer.update(req.body, {
      where: { id: req.params.id },
      returning: true
    })
      .then(([, reviewer]) => res.send(reviewer[0]))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Reviewer.destroy({
      where: { id: req.params.id }
    })
      .then(([, reviewer]) => res.send(reviewer[0]))
      .catch(next);
  });

