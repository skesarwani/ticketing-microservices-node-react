import express from 'express';
import { ticketsRouting } from './routes/tickets-routing'
import { NotFoundError } from '@skticketing/common';
const router = express.Router();

router.use('/tickets', ticketsRouting);
router.all('*', async (req,res, next) => {
    throw new NotFoundError();
})

export { router as routing };