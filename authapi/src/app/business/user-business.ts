import { User } from "../models/user";
import { BadRequestError } from "@skticketing/common";
import { Password } from "../services/password";
import { IUserDoc } from "../models/contracts/user-contracts";

export class UserBusiness {

    constructor(){}

    async signupUser(email: string, password: string){
        const existingUser = await User.findOne({ email });
        if(existingUser){
            throw new BadRequestError('Email already exists');
        } else{
            const user = User.build({email, password});
            await user.save();

            return user;
        }
    }

    async signinUser(email: string, password: string): Promise<IUserDoc>{
        const existingUser = await User.findOne({ email });
        if(!existingUser){
            throw new BadRequestError('Wrong Email or Password');
        }
        const pwdMatch = await Password.compare(existingUser.password, password);
        if(!pwdMatch){
            throw new BadRequestError('Wrong Email or Password');
        }
        return existingUser;
    }
}