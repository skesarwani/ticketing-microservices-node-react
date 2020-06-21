import { ValidationError } from "express-validator";
import { Utility } from "../utility";
import { CustomErrorBase } from "./custom-error-base";
import { IErrorSkeleton } from "../contracts/error-contracts";

export class RequestValidationError extends CustomErrorBase{
    statusCode = 400;
    constructor(public errors: ValidationError[]){
        super('Invalid request parameters');
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeErrors(): IErrorSkeleton[]{
        return Utility.transformErrorList(this.errors);
    }
}