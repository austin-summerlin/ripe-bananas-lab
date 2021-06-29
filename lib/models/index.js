import Studio from './Studio.js';
import Film from './Film.js';

Studio.hasMany(Film);
Film.belongsTo(Studio);
