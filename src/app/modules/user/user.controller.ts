import { Request, Response } from 'express';
import { UserService } from './user.service';
import { userValidation } from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const zodParseedUser = userValidation.userValidationSchema.parse(user);
    const userData = {
      ...zodParseedUser,
      role: 'seller' as const,
      isActive: true,
    };
    const result = await UserService.createUserIntoDB(userData);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      statusCode: 201,
      result,
      data: {
        _id: result._id,
        name: result.name,
        email: result.email,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Something went wrong',
      statusCode: 400,
      error: error,
      stack: (error as Error).stack,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await UserService.getUserFromDB();

    res.send({
      status: true,
      message: 'All Users Retrived successfully',
      data: {
        allUsers,
      },
    });
  } catch (error) {
    res.send({
      status: false,
      message: 'Something went wrong!',
      error,
    });
  }
};

const blockUser = async (req: Request, res: Response) => {
  try {
    const email = req.params.email;
    const result = await UserService.blockUserFromDB(email);

    res.send({
      status: true,
      message: 'User blocked successfully',
      data: {
        result,
      },
    });
  } catch (error) {
    res.send({
      status: false,
      message: 'Something went wrong!',
      error,
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
  blockUser
};
