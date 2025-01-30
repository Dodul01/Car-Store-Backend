import { TLoginUser } from './auth.interface';
import bcrypt from 'bcrypt';
import { createToken } from './auth.utils';
import config from '../../config';
import { User } from '../user/user.model';

const updatePassword = async (
  data: { currentPassword: string; newPassword: string },
  userId: string,
) => {
  const user = await User.findById(userId).select('+password');

  if (!user) {
    throw {
      message: 'User not found',
      statusCode: 404,
    };
  }

  // Verify current password
  const isPasswordMatch = await bcrypt.compare(
    data.currentPassword,
    user.password,
  );

  if (!isPasswordMatch) {
    throw {
      message: 'Current password is incorrect',
      statusCode: 401,
    };
  }

  // Validate new password
  if (data.currentPassword === data.newPassword) {
    throw {
      message: 'New password must be different from current password',
      statusCode: 400,
    };
  }

  if (data.newPassword.length < 6) {
    throw {
      message: 'Password must be at least 6 characters',
      statusCode: 400,
    };
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(data.newPassword, 10);

  // Update password using direct DB update
  await User.updateOne({ _id: userId }, { $set: { password: hashedPassword } });

  return {
    message: 'Password updated successfully',
  };
};

const loginUser = async (payload: TLoginUser) => {
  const user = await User.findOne({ email: payload.email });

  if (!user) {
    throw {
      message: 'User not found',
      statusCode: 404,
      details: { field: 'email', issue: 'No user exists with the given email' },
    };
  }

  const isPasswordMatch = await bcrypt.compare(payload.password, user.password);

  if (!isPasswordMatch) {
    throw {
      message: 'Invalid credentials',
      statusCode: 401,
      details: {
        field: 'password',
        issue: 'The provided password is incorrect',
      },
    };
  }

  if (!user.isActive) {
    throw {
      message: 'You account is blocked.',
      statusCode: 403,
    };
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
    _id: user._id.toString(),
  };

  const jwtToken = createToken(
    jwtPayload,
    config.Jwt_Token as string,
    config.jwt_access_expiry as string,
  );

  return {
    jwtToken,
  };
};

export const AuthServices = {
  loginUser,
  updatePassword,
};
