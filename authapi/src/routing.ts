import express from 'express';
import { userRouting } from './routes/user-routing'
import { NotFoundError } from './models/errors/not-found-error';
const router = express.Router();

router.use('/users', userRouting);
router.all('*', async (req,res, next) => {
    throw new NotFoundError();
})

export { router as routing };