import express from 'express';
import { CarControllers } from './car.controller';

const router = express.Router();

router.post('/', CarControllers.createCar);
router.get('/', CarControllers.getCar);
router.get('/:carId', CarControllers.getSingleCar);

export const CarRouter = router;