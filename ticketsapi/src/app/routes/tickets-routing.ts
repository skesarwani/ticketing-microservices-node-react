import express, { Request, Response } from 'express';
import { body } from 'express-validator';
const router = express.Router();

import { TicketsController } from '../controllers/tickets-controller';
import { requireAuth, validateRequest } from '@skticketing/common';


router.post('/',
    requireAuth,
    [
        body('title')
        .not()
        .isEmpty()
        .withMessage('Title is required'),

        body('price')
        .isFloat({ gt: 0 })
        .withMessage('Price must be greater than zero')
    ],
    validateRequest,
    (req: Request, res: Response) => {
        const ticketsController = new TicketsController();
        return ticketsController.createTicket(req, res)
    });

router.get('/', (req: Request, res: Response) => {
    const ticketsController = new TicketsController();
    return ticketsController.getAllTickets(req, res);
});

router.get('/:id', (req: Request, res: Response) => {
    const ticketsController = new TicketsController();
    return ticketsController.getTicketById(req, res)
});

router.put('/:id',
    requireAuth,
    [
        body('title')
        .not()
        .isEmpty()
        .withMessage('Title is required'),

        body('price')
        .isFloat({ gt: 0 })
        .withMessage('Price must be greater than zero')
    ],
    validateRequest,
    (req: Request, res: Response) => {
    const ticketsController = new TicketsController();
    return ticketsController.updateTicketById(req, res)
});

export { router as ticketsRouting };