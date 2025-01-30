export interface TUser {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'seller';
  isActive: boolean;
  address?: string;
}
