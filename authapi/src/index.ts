import express from 'express';
import 'express-async-errors'
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

import { routing } from './routing';
import { errorHandler } from './middlewares/error-handler';
const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: true
    })
);
app.use('/api', routing);
app.use(errorHandler);


const start = async () => {
    try{
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('Connected to MongoDB')
    } catch(err){
        console.error(err);
    }

    app.listen(3000, () => {
        console.log('Listening on port 3000!!!');
    });
};

start();