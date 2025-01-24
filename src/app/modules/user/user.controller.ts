import { Request, Response } from 'express';
import { userValidationSchema } from './user.validation';

const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const payload = req.body;
    const zodParsedData = userValidationSchema.parse(payload);
    console.log(zodParsedData);

    res.status(201).send({
      status: true,
      message: 'API REACH SUCCESSFULLY.',
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('From error ', error.issues);
  }
};

export const UserControllers = {
  createUser,
};
