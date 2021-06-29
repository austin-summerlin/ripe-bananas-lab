import Actor from './Actor.js';
import Film from './Film.js';

Actor.belongsToMany({ through: 'ActorFilm' });
Film.belongsToMany({ through: 'ActorFilm' });
