import express from 'express';
import { CarControllers } from './car.controller';
import auth from '../../middleware/auth';

const router = express.Router();

router.post('/', auth('admin'), CarControllers.createCar);
router.get('/', CarControllers.getCar);
router.get('/:carId', CarControllers.getSingleCar);
router.put('/:carId', auth('admin'), CarControllers.updateSingleCar);
router.delete('/:carId', auth('admin'), CarControllers.deleteSingleCar);

export const CarRouter = router;
