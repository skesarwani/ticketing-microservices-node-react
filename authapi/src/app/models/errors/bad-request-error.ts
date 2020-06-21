import { CustomErrorBase } from "./custom-error-base";
import { IErrorSkeleton } from "../contracts/error-contracts";

export class BadRequestError extends CustomErrorBase{
    statusCode = 400;

    constructor(public message: string){
        super(message);

        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    serializeErrors(): IErrorSkeleton[] {
        return [{ message: this.message}];
    }
}