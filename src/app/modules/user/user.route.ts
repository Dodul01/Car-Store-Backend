import express from 'express';
import { UserControllers } from './user.controller';
import auth from '../../middleware/auth';

const router = express.Router();

router.post('/create-user', UserControllers.createUser);
router.put('/block-user/:email', auth('admin'), UserControllers.blockUser);
router.get('/all-users', auth('admin'), UserControllers.getAllUsers);

export const UserRouter = router;
