import { NextFunction, Request, RequestHandler, Response } from 'express';
import { UserServices } from './user.service';
import catchAsync from '../../middlewares/utils/catchAsync';

const createStudent: RequestHandler = catchAsync(async (req, res) => {
  //data validation using joi
  // const { error, value } = studentValidationSchema.validate(studentData);
  // console.log(error, value);

  // if (error) {
  //   res.status(500).json({
  //     success: false,
  //     message: 'something went wrong',
  //     error,
  //   });
  // }

  //validation using zod

  const { password, student: studentData } = req.body;

  //will call service func to send this data
  const result = await UserServices.createStudentIntoDB(password, studentData);
  //send response

  res.status(200).json({
    success: true,
    message: 'Student is created Successfully',
    data: result,
  });
});

export const UserControllers = {
  createStudent,
};
