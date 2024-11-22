import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { CarRouter } from './app/modules/car/car.route';
const app: Application = express();

//Parser
app.use(express.json());
app.use(cors());

// Application Router
app.use('/api/cars', CarRouter);

/**
 * TODO: Validation error check the problem
 * 
 * 
 * 
 * 
 * */ 

app.get('/', (req: Request, res: Response) => {
  res.send({ status: true, message: 'Server is running.' });
});

export default app;