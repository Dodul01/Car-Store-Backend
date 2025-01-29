import express from 'express';
import { OrderControllers } from './order.controller';
import auth from '../../middleware/auth';

const router = express.Router();

router.post('/', auth('seller'), OrderControllers.createOrder);
router.get('/revenue', auth('admin'), OrderControllers.getRevenue);
router.get('/:email', auth('seller', 'admin'), OrderControllers.getOrders);

export const OrderRouter = router;
