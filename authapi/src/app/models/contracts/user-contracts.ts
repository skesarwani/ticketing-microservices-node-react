import mongoose from 'mongoose';

export interface IUserModel extends mongoose.Model<IUserDoc> {
    build(attrs: IUserAttrs): IUserDoc;
}

export interface IUserAttrs {
    email: string;
    password: string;
}

export interface IUserDoc extends mongoose.Document {
    email: string;
    password: string;
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