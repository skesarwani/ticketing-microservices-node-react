import express from 'express';
import 'express-async-errors'
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { routing } from './routing';
import { errorHandler } from './middlewares/error-handler';
const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test'
    })
);
app.use('/api', routing);
app.use(errorHandler);

export { app };