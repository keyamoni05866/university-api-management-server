import httpStatus from 'http-status';
import catchAsync from '../../middlewares/utils/catchAsync';
import { AcademicDepartmentServices } from './academicDepartment.service';

const createAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentServices.createAcademicDepartmentIntoDB(req.body);
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Academic Department create Successfully',
    data: result,
  });
});

const getAllAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentServices.getAllAcademicDepartmentsFromDB();
  res.status(httpStatus.OK).json({
    success: true,
    message: 'All Academic Department get Successfully',
    data: result,
  });
});

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  const result =
    await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(
      departmentId,
    );
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Single Academic Department get Successfully',
    data: result,
  });
});

const updateDepartment = catchAsync(async (req, res) => {
  const departmentData = req.body;
  const { departmentId } = req.params;
  const result = await AcademicDepartmentServices.updateDepartmentIntoDB(
    departmentId,
    departmentData,
  );
  res.status(httpStatus.OK).json({
    success: true,
    message: ' Academic Department update Successfully',
    data: result,
  });
});

export const AcademicDepartmentControllers = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateDepartment,
};
