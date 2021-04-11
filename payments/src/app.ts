import express from 'express';
import 'express-async-errors'; // used so we don't have to call next on async functions. Just throw errors.
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { errorHandler, NotFoundError, currentUser } from '@chorney-tickets/common';
import { createChargeRouter } from './routes/new';

const app = express();
app.set('trust proxy', true); // Trust stuff and be secure even though it's coming through a proxy
app.use(json());
app.use(
  cookieSession({
    signed: false,
    // secure: process.env.NODE_ENV !== 'test' // cookies will only be sent over an https connection
    secure: false,
  })
);

app.use(currentUser);

app.use(createChargeRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
