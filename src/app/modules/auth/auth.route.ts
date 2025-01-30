import express from 'express';
import { AuthControllers } from './auth.controller';

const router = express.Router();

router.post('/auth/login', AuthControllers.loginUser);
// router.put('/auth/update-password/:id', AuthControllers.updateUserPassword);
router.put(
  '/auth/update-password/:id',
  AuthControllers.updateUserPassword as express.RequestHandler,
);

export const AuthRouter = router;
