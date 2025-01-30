import { Schema } from 'mongoose';

export type TOrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered';

export type TOrder = {
  email: string;
  car: Schema.Types.ObjectId | string;
  quantity: number;
  totalPrice: number;
  createdAt?: Date;
  updatedAt?: Date;
  status: TOrderStatus;
  address: string;
  phone: string;
  city: string;
  id: string;
  paymentMethod?: {
    id: string;
    status: string;
    amount: number;
    createdAt: number;
  };
};
