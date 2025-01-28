import { TLoginUser } from './auth.interface';
import bcrypt from 'bcrypt';
import { createToken } from './auth.utils';
import config from '../../config';
import { User } from '../user/user.model';

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
};
