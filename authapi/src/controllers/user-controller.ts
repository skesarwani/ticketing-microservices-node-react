import { Response, Request } from "express";
import { validationResult } from "express-validator";
import { RequestValidationError } from "../models/errors/request-validation-error";
import { UserBusiness } from "../business/user-business";

export class UserController {
    userLogic: UserBusiness;
    constructor(){
        this.userLogic = new UserBusiness();
    }
    async getCurrentUser(req: Request, res: Response){
        res.send('Hi from Current user in controller !!');
    }

    async signupUser(req: Request, res: Response){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            throw new RequestValidationError(errors.array());
        }
        const { email, password } = req.body;
        const user = await this.userLogic.signupUser(email, password);
        return res.status(201).send(user);
    }
}