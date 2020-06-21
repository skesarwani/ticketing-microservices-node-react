import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { IUserPayload } from "../models/contracts/user-contracts";


export const currentUser = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.session?.jwt) {
        return next();
    }

    try {
        const payload = jwt.verify(req.session?.jwt, process.env.JWT_KEY!) as IUserPayload;
        req.currentUser = payload;
    } catch (err) {
    }
    next();
};