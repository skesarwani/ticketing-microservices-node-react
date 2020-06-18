import { User } from "../models/user";
import { BadRequestError } from "../models/errors/bad-request-error";

export class UserBusiness {

    constructor(){}

    public async signupUser(email: string, password: string){
        const existingUser = await User.findOne({ email });
        if(existingUser){
            throw new BadRequestError('Email already exists');
        } else{
            const user = User.build({email, password});
            await user.save();
            return user;
        }
    }
}