import { model, Schema } from 'mongoose';
import { TOrder } from './order.interface';

const orderSchema = new Schema<TOrder>(
  {
    email: { type: String, required: [true, 'Email is required.'] },
    car: { type: String, required: [true, 'Car is required.'] },
    quantity: { type: Number, required: [true, 'Quantity is required.'] },
    totalPrice: { type: Number, required: [true, 'Total price is required.'] },
  },
  {
    timestamps: true,
  },
);

export const Order = model<TOrder>('Order', orderSchema);