/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { AuthServices } from './auth.service';
import config from '../../config';

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await AuthServices.loginUser(req.body);
    const { jwtToken } = result;

    res.status(200).json({
      success: true,
      message: 'Login successful',
      statusCode: 200,
      data: {
        token: jwtToken,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status((error as any).statusCode || 400).json({
        success: false,
        message: error.message || 'An error occurred',
        statusCode: (error as any).statusCode || 400,
        error: (error as any).details || null,
        stack: config.NODE_ENV === 'production' ? undefined : error.stack,
      });
    } else {
      res.status((error as any).statusCode).json({
        success: false,
        message: (error as any).message,
        statusCode: (error as any).statusCode,
        error: error,
        stack: (error as any).stack,
      });
    }
  }
};


const updateUserPassword = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const { currentPassword, newPassword } = req.body;

    // Validate request body
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Both current and new password are required',
        statusCode: 400,
      });
    }

    const result = await AuthServices.updatePassword(
      { currentPassword, newPassword },
      userId,
    );

    res.status(200).json({
      success: true,
      message: 'Password updated successfully',
      statusCode: 200,
      data: result,
    });
  } catch (error: any) {
    console.log(error);
  }
};

export const AuthControllers = {
  loginUser,
  updateUserPassword,
};
