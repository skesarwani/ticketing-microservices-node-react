import mongoose from 'mongoose';
import { ITicketAttrs, ITicketDoc, ITicketModel } from './contracts/ticket-contracts';

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret){
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v
        }
    }
});

ticketSchema.statics.build = (attrs: ITicketAttrs) => {
    return new Ticket(attrs);
}

const Ticket = mongoose.model<ITicketDoc, ITicketModel>('Ticket', ticketSchema);

export { Ticket };