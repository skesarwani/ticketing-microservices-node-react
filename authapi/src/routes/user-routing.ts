import express, { Request, Response } from 'express';
import { body } from  'express-validator';
const router = express.Router();
import { UserController } from '../controllers/user-controller';


router.get('/currentuser', (req: Request, res: Response) => {
    const userController = new UserController();
    return userController.getCurrentUser(req, res);
});

router.post('/signin', (req,res) => {
    res.send('Hi there signin!');
});

router.post('/signout', (req,res) => {
    res.send('Hi there logout!');
});

router.post('/signup',[
    body('email')
        .isEmail()
        .withMessage('Email is not valid'),
    body('password')
        .trim()
        .isLength({min: 4, max: 20})
        .withMessage('Password must be between 4 and 20 characters')
], (req: Request, res: Response) => {
    const userController = new UserController();
    return userController.signupUser(req, res)
});

export { router as userRouting };