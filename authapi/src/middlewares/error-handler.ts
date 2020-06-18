import { Request, Response, NextFunction } from "express";
import { ErrorMetadata } from "../models/models";
import { CustomErrorBase } from "../models/errors/custom-error-base";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof CustomErrorBase) {
        return res.status(err.statusCode).send(new ErrorMetadata(err.serializeErrors()))
    }
    return res.status(400).send(new ErrorMetadata([{ message: err.message }]));
}