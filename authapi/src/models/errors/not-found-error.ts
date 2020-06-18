import { CustomErrorBase } from "./custom-error-base";
import { IErrorSkeleton } from "../contracts/error-contracts";

export class NotFoundError extends CustomErrorBase{
    statusCode = 404;
    constructor(){
        super('Route not found');
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    serializeErrors(): IErrorSkeleton[]{
       return [{ message: 'Not Found' }];
    }
}