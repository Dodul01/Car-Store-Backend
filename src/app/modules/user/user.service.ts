import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (user: TUser) => {
  const result = await User.create(user);

  return result;
};

const getUserFromDB = async () => {
  const result = await User.find({ role: 'seller' });
  return result;
};

const blockUserFromDB = async (email: string) => {
  const user = await User.findOne({ email: email });
  if (!user) return null;

  const result = await User.findOneAndUpdate(
    { email: email },
    { $set: { isActive: !user.isActive } },  // Toggle the value of isActive
    { new: true }  // Return the updated user document
  );

  return result;
};

export const UserService = {
  createUserIntoDB,
  getUserFromDB,
  blockUserFromDB,
};
