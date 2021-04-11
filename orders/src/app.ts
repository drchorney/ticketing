import express from 'express';
import 'express-async-errors'; // used so we don't have to call next on async functions. Just throw errors.
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { newOrderRouter } from './routes/new';
import { showOrderRouter } from './routes/show';
import { indexOrderRouter } from './routes/index';
import { deleteOrderRouter } from './routes/delete';

import { errorHandler, NotFoundError, currentUser } from '@chorney-tickets/common';

const app = express();
app.set('trust proxy', true); // Trust stuff and be secure even though it's coming through a proxy
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test' // cookies will only be sent over an https connection
  })
);

app.use(currentUser);

app.use(indexOrderRouter);
app.use(showOrderRouter);
app.use(newOrderRouter);
app.use(deleteOrderRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
