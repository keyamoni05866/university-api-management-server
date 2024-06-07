import httpStatus from 'http-status';
import catchAsync from '../../middlewares/utils/catchAsync';
import { FacultyServices } from './faculty.service';

const getAllFaculties = catchAsync(async (req, res) => {
  const result = await FacultyServices.getAllFacultiesFromDB(req.query);

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Faculties Get Successfully',
    data: result,
  });
});

export const FacultyControllers = {
  getAllFaculties,
};
