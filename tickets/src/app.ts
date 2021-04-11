import express from 'express';
import 'express-async-errors'; // used so we don't have to call next on async functions. Just throw errors.
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { createTicketRouter } from './routes/new';
import { showTicketRouter } from './routes/show';
import { indexTicketRouter } from './routes/index';
import { updateTicketRouter } from './routes/update';

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

app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
