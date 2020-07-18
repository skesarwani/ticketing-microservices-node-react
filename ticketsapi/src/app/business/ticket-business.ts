import { Ticket } from "../models/ticket";
import { BadRequestError, NotFoundError, NotAuthorizedError } from "@skticketing/common";
import { ITicketAttrs } from "../models/contracts/ticket-contracts";

export class TicketBusiness {

    constructor(){}

    async createTicket(title: string, price: number, userId: string){
        return await Ticket.build({
            title, price, userId: userId
        })
    }

    async getTicketById(id: string){
        return await Ticket.findById(id);
    }

    async getAllTickets(){
        return await Ticket.find({});
    }

    async updateTicketById(id: string,ticket: ITicketAttrs, currentUserId?: string){
        const ticketRef =  await Ticket.findById(id);
        if(!ticketRef){
            throw new NotFoundError();
        }

        if(ticketRef.userId !== currentUserId){
            throw new NotAuthorizedError();
        }

        ticketRef.set({
            title: ticket.title,
            price: ticket.price
        });

        await ticketRef.save();

        return ticket;
    }

    // async signinUser(email: string, password: string): Promise<IUserDoc>{
    //     const existingUser = await User.findOne({ email });
    //     if(!existingUser){
    //         throw new BadRequestError('Wrong Email or Password');
    //     }
    //     const pwdMatch = await Password.compare(existingUser.password, password);
    //     if(!pwdMatch){
    //         throw new BadRequestError('Wrong Email or Password');
    //     }
    //     return existingUser;
    // }
}