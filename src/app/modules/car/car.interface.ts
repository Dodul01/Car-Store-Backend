export type TCar = {
  brand: string;
  model: string;
  year: number;
  price: number;
  category: 'Sedan' | 'SUV' | 'Truck' | 'Coupe' | 'Convertible';
  description: string;
  quantity: number;
  image: string;
  inStock: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};
