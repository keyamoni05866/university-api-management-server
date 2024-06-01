import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import mongoose from 'mongoose';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  //create a user object
  const userData: Partial<TUser> = {};

  //if password is not given then use default password
  userData.password = password || (config.default_pass as string);

  //student role
  userData.role = 'student';

  //find academic student info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  if (!admissionSemester) {
    throw new AppError(httpStatus.NOT_FOUND, 'Admission semester not found');
  }

  //session
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    userData.id = await generateStudentId(admissionSemester);

    //create a user
    //create transaction-1
    const newUser = await User.create([userData], { session }); //aga chilo object transaction use korar jonno hoye jabe array

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    //set id, _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference id

    //create transaction -2
    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    await (await session).commitTransaction();
    await (await session).endSession();
    return newStudent;
  } catch (err) {
    (await session).abortTransaction();
    (await session).endSession();
  }
};

export const UserServices = {
  createStudentIntoDB,
};