import express from 'express';
import { OrderControllers } from './order.controller';
import auth from '../../middleware/auth';

const router = express.Router();

router.post('/', auth('seller'), OrderControllers.createOrder);
router.get('/allOrders', auth('admin'), OrderControllers.getAllOrders);
router.get('/revenue', auth('admin'), OrderControllers.getRevenue);
router.put('/order-status/:id', auth('admin'), OrderControllers.updateOrderStatus);
router.delete('/:id', auth('admin', 'seller'), OrderControllers.deleteOrder);
router.get('/:email', auth('seller', 'admin'), OrderControllers.getOrders);

export const OrderRouter = router;
