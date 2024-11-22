import express from 'express';
import { CarControllers } from './car.controller';

const router = express.Router();

router.post('/', CarControllers.createCar);
router.get('/', CarControllers.getCar);
router.get('/:carId', CarControllers.getSingleCar);
router.put('/:carId', CarControllers.updateSingleCar);
router.delete('/:carId', CarControllers.deleteSingleCar);

export const CarRouter = router;