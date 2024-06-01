import httpStatus from 'http-status';
import catchAsync from '../../middlewares/utils/catchAsync';
import { AcademicSemesterServices } from './academicSemester.service';

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  );
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Academic Semester Created Successfully',
    data: result,
  });
});

//find all semester data
const getAllAcademicSemesterData = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllAcademicSemesterFromDB();
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Academic Semester Retrieved Successfully',
    data: result,
  });
});

//find single data
const getSingleSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result =
    await AcademicSemesterServices.getSingleSemesterFromDB(semesterId);
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Single Semester Retrieved Successfully',
    data: result,
  });
});

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemesterData,
  getSingleSemester,
};
