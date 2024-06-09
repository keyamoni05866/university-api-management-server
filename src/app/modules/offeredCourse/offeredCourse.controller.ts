import httpStatus from 'http-status';
import catchAsync from '../../middlewares/utils/catchAsync';
import { OfferedCourseServices } from './offeredCourse.service';

const createOfferedCourse = catchAsync(async (req, res) => {
  const result = await OfferedCourseServices.createOfferedCourseIntoDB(
    req.body,
  );
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Offered Course Create Successfully',
    data: result,
  });
});

const getAllOfferedCourse = catchAsync(async (req, res) => {
  const result = await OfferedCourseServices.getAllOfferedCourseFromDB();
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Offered Course Retrieved Successfully',
    data: result,
  });
});
const getSingleOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await OfferedCourseServices.getSingleOfferedCourseFromDB(id);
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Single Offered Course Retrieved Successfully',
    data: result,
  });
});
const updateOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await OfferedCourseServices.updateOfferedCourseFromDB(
    id,
    req.body,
  );
  res.status(httpStatus.OK).json({
    success: true,
    message: ' Offered Course Updated Successfully',
    data: result,
  });
});

export const OfferedCourseControllers = {
  createOfferedCourse,
  getAllOfferedCourse,
  getSingleOfferedCourse,
  updateOfferedCourse,
};
