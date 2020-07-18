import mongoose from 'mongoose';

export interface ITicketModel extends mongoose.Model<ITicketDoc> {
    build(attrs: ITicketAttrs): ITicketDoc;
}

export interface ITicketAttrs {
    title: string;
    price: number;
    userId: string;
}

export interface ITicketDoc extends mongoose.Document {
    title: string;
    price: number;
    userId: string;
}

export interface IUserPayload {
    id: string;
    email: string;
}

declare global {
    namespace Express {
        interface Request {
            currentUser?: IUserPayload;
        }
    }
}