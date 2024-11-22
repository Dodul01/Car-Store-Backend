import { Schema, } from 'mongoose';

export type TOrder = {
  email: string;
  car: Schema.Types.ObjectId | string;
  quantity: number;
  totalPrice: number;
  createdAt?: Date;
  updatedAt?: Date;
};
