import { ValidationError } from "express-validator";

export class Utility{
    public static transformErrorList(errorList: ValidationError[]){
        return errorList.map((error) => {
            return {
                message: error.msg,
                field: error.param
            }
        });
    }
}