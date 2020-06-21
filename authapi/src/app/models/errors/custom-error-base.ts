import { ISerializableCustomError, IErrorSkeleton } from "../contracts/error-contracts";

export abstract class CustomErrorBase extends Error implements ISerializableCustomError{
    abstract serializeErrors(): IErrorSkeleton[];
    abstract statusCode: number;

    constructor(message: string){
        super(message);
        Object.setPrototypeOf(this, CustomErrorBase.prototype);
    }
}