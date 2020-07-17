import express from 'express';
import { userRouting } from './routes/user-routing'
import { NotFoundError } from '@skticketing/common';
const router = express.Router();

router.use('/users', userRouting);
router.all('*', async (req,res, next) => {
    throw new NotFoundError();
})

export { router as routing };