import { IErrorSkeleton } from "./contracts/error-contracts";

export class ErrorMetadata{
    constructor(errorList: Array<IErrorSkeleton>){
        this.errors = errorList;
    }
    errors: Array<IErrorSkeleton>;
}