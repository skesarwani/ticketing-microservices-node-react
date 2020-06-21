import { CustomErrorBase } from "./custom-error-base";
import { IErrorSkeleton } from "../contracts/error-contracts";

export class DatabaseConnectionError extends CustomErrorBase{
    statusCode = 500;
    constructor(reason = 'Error connecting to DB'){
        super(reason);
        this.message = reason;
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeErrors(): IErrorSkeleton[]{
        return [{ message: this.message }];
    }
}