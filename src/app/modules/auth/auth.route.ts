import express from 'express';
import { AuthControllers } from './auth.controller';

const router = express.Router();

router.post('/auth/login', AuthControllers.loginUser);


export const AuthRouter = router;
