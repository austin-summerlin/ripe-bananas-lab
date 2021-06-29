import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import studios from './controllers/studios.js';
import actors from './controllers/actors.js';
import reviewers from './controllers/reviewers.js';
import films from './controllers/films.js';

const app = express();

app.use(express.json());

app.use('/api/v1/studios', studios);
app.use('/api/v1/actors', actors);
app.use('/api/v1/reviewers', reviewers);
app.use('/api/v1/films', films);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
