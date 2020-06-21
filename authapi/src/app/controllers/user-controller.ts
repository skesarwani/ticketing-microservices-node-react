import { Response, Request } from "express";
import jwt from 'jsonwebtoken';

import { UserBusiness } from "../business/user-business";
import { IUserDoc } from "../models/contracts/user-contracts";

export class UserController {
    userLogic: UserBusiness;
    constructor() {
        this.userLogic = new UserBusiness();
    }
    public async getCurrentUser(req: Request, res: Response) {
        res.send({ currentUser: req.currentUser || null });
    }

    public async signupUser(req: Request, res: Response) {
        const { email, password } = req.body;
        const user = await this.userLogic.signupUser(email, password);

        // Generate JWT
        this.createJwtWithUser(user, req);

        return res.status(201).send(user);
    }

    public async signinUser(req: Request, res: Response) {
        const { email, password } = req.body;
        const user = await this.userLogic.signinUser(email, password);

        // Generate JWT
        this.createJwtWithUser(user, req);

        return res.status(200).send(user);
    }

    public async signoutUser(req: Request, res: Response) {
        req.session = null;
        res.send({});
    }

    private createJwtWithUser(user: IUserDoc, req: Request) {
        const userJwt = jwt.sign({
            id: user.id,
            email: user.email
        }, process.env.JWT_KEY!);

        // Store jwt in session object
        req.session = {
            jwt: userJwt
        };
    }
}