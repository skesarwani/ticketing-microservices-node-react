import express, { Request, Response } from 'express';
import { body } from 'express-validator';
const router = express.Router();

import { UserController } from '../controllers/user-controller';
import { validateRequest } from '../middlewares/validate-request';
import { currentUser } from '../middlewares/current-user';


router.get('/currentuser', currentUser, (req: Request, res: Response) => {
    const userController = new UserController();
    return userController.getCurrentUser(req, res);
});

router.post('/signin', [
    body('email')
        .isEmail()
        .withMessage('Email is not valid'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Please provide a password')
], validateRequest,
    (req: Request, res: Response) => {
        const userController = new UserController();
        return userController.signinUser(req, res)
    });

router.post('/signout', (req: Request, res: Response) => {
    const userController = new UserController();
    return userController.signoutUser(req, res);
});

router.post('/signup', [
    body('email')
        .isEmail()
        .withMessage('Email is not valid'),
    body('password')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('Password must be between 4 and 20 characters')
], validateRequest,
    (req: Request, res: Response) => {
        const userController = new UserController();
        return userController.signupUser(req, res)
    });

export { router as userRouting };