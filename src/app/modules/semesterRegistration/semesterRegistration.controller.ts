import httpStatus from 'http-status';
import catchAsync from '../../middlewares/utils/catchAsync';
import { SemesterRegistrationServices } from './semesterRegistration.service';

const createSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await SemesterRegistrationServices.createSemesterRegistrationIntoDB(
      req.body,
    );
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Semester Registration Create Successfully',
    data: result,
  });
});
const getAllSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await SemesterRegistrationServices.getAllSemesterRegistrationFromDB(
      req.query,
    );
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Semester Registration Retrieved Successfully',
    data: result,
  });
});
const getSingleSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await SemesterRegistrationServices.getSingleSemesterRegistrationFromDB(id);
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Single Semester Registration Retrieved Successfully',
    data: result,
  });
});
const updateSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await SemesterRegistrationServices.updateSemesterRegistrationFromDB(
      id,
      req.body,
    );
  res.status(httpStatus.OK).json({
    success: true,
    message: ' Semester Registration Update Successfully',
    data: result,
  });
});

export const SemesterRegistrationControllers = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
};
