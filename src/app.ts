import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { CarRouter } from './app/modules/car/car.route';
import { OrderRouter } from './app/modules/order/order.router';
import { UserRouter } from './app/modules/user/user.route';
const app: Application = express();

//Parser
app.use(express.json());
app.use(cors());

// Application Router
app.use('/api/cars', CarRouter);
app.use('/api/orders', OrderRouter);
app.use('/api/users', UserRouter);

app.get('/', (req: Request, res: Response) => {
  res.send({ status: true, message: 'Server is running.' });
});

export default app;
