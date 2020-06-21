import { CustomErrorBase } from "./custom-error-base";
import { IErrorSkeleton } from "../contracts/error-contracts";

export class NotAuthorizedError extends CustomErrorBase{
    statusCode = 401;
    constructor(){
        super('Not Authorized');
        Object.setPrototypeOf(this, NotAuthorizedError.prototype);
    }

    serializeErrors(): IErrorSkeleton[]{
       return [{ message: 'Not Authorized' }];
    }
}