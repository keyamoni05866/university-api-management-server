import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';
import { Query } from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload.academicSemester;
  ///semester  exist or not
  const isAcademicSemesterExist =
    await AcademicSemester.findById(academicSemester);
  if (!isAcademicSemesterExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Semester not found');
  }
  //semester registration exist or not
  const isSemesterRegistrationExist = await SemesterRegistration.findOne({
    academicSemester,
  });
  if (isSemesterRegistrationExist) {
    throw new AppError(
      httpStatus.CONFLICT,
      'The Semester is already Registered!',
    );
  }

  //check if there any registered semester that is already "UPCOMING | ONGOING"
  const isThereAnyUpcomingOrOngoingSemester =
    await SemesterRegistration.findOne({
      $or: [{ status: 'UPCOMING' }, { status: 'ONGOING' }],
    });
  if (isThereAnyUpcomingOrOngoingSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is already an ${isThereAnyUpcomingOrOngoingSemester.status} semester registered`,
    );
  }
  const result = await SemesterRegistration.create(payload);
  return result;
};

const getAllSemesterRegistrationFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .fields();
  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};

const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result =
    await SemesterRegistration.findById(id).populate('academicSemester');
  return result;
};
const updateSemesterRegistrationFromDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  const currentSemester = await SemesterRegistration.findById(id);
  const requestedSemester = payload.status;
  //check semester exist or not
  if (!currentSemester) {
    throw new AppError(httpStatus.NOT_FOUND, 'This semester is not exist');
  }
  //IF THE REQUESTED SEMESTER IS ENDED, WE WILL NOT ALLOW TO UPDATE
  if (currentSemester?.status === 'ENDED') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This semester is already ${currentSemester?.status}`,
    );
  }
  if (currentSemester?.status === 'UPCOMING' && requestedSemester === 'ENDED') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You cannot change directly ${currentSemester?.status} to ${requestedSemester}`,
    );
  }
  if (
    currentSemester?.status === 'ONGOING' &&
    requestedSemester === 'UPCOMING'
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You cannot change directly ${currentSemester?.status} to ${requestedSemester}`,
    );
  }

  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const SemesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationFromDB,
};
