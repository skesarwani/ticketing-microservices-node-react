import { IUserPayload } from "./contracts/user-contracts";


// Add current user to Request
declare global {
    namespace Express {
        interface Request {
            currentUser?: IUserPayload;
        }
    }
}