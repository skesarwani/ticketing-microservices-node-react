import { Response, Request } from "express";
import { TicketBusiness } from "../business/ticket-business";
import { NotFoundError, NotAuthorizedError } from "@skticketing/common";

export class TicketsController {
    ticketLogic: TicketBusiness;
    constructor() {
        this.ticketLogic = new TicketBusiness();
    }

    public async createTicket(req: Request, res: Response) {
        const { title, price } = req.body;
        const ticket = await this.ticketLogic.createTicket(title, price, req.currentUser!.id);
        await ticket.save();
        return res.status(201).send(ticket);
    }

    public async getTicketById(req: Request, res: Response) {
        const id = req.params.id;
        const ticket = await this.ticketLogic.getTicketById(id);
        if(!ticket){
            throw new NotFoundError();
        }
        res.send(ticket);
    }

    public async getAllTickets(req: Request, res: Response) {
        const tickets = await this.ticketLogic.getAllTickets();
        if(!tickets){
            throw new NotFoundError();
        }
        res.send(tickets);
    }

    public async updateTicketById(req: Request, res: Response) {
        const id = req.params.id;
        const ticket = await this.ticketLogic.updateTicketById(id, req.body, req.currentUser?.id);
        res.send(ticket);
    }
}