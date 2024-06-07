import httpStatus from 'http-status';
import catchAsync from '../../middlewares/utils/catchAsync';
import { CourseServices } from './course.service';

const createCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.createCourseIntoDB(req.body);
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Course created Successfully',
    data: result,
  });
});

const getAllCourses = catchAsync(async (req, res) => {
  const result = await CourseServices.getAllCoursesFromDB(req.query);
  res.status(httpStatus.OK).json({
    success: true,
    message: 'All Courses get Successfully',
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.getSingleCourseFromDB(id);
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Single Course get Successfully',
    data: result,
  });
});
const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.deleteCourseFromDB(id);
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Course Deleted Successfully',
    data: result,
  });
});
const updateCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.updateCourseFromDB(id, req.body);
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Course Updated Successfully',
    data: result,
  });
});
const assignFacultiesWithCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;
  const result = await CourseServices.assignFacultiesWithCourseIntoDB(
    courseId,
    faculties,
  );
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Faculty assign   Successfully',
    data: result,
  });
});
const removeFacultiesFromCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;
  const result = await CourseServices.removeFacultiesFromCourseFromDB(
    courseId,
    faculties,
  );
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Faculty remove   Successfully',
    data: result,
  });
});

export const CourseControllers = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  deleteCourse,
  updateCourse,
  assignFacultiesWithCourse,
  removeFacultiesFromCourse,
};
