import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { academicSemesterNameCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid Semester Code');
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

//getting all data

const getAllAcademicSemesterFromDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};
//getting single data from db

const getSingleSemesterFromDB = async (id: string) => {
  const result = await AcademicSemester.findOne({ id });
  return result;
};

//update data from db

// const updateSemesterData = async(id:string,payload:TAcademicSemester){
//       const result = await AcademicSemester.findByIdAndUpdate({id:id})
// }

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterFromDB,
  getSingleSemesterFromDB,
};
