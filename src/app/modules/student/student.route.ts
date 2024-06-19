import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import studentValidationSchema from './student.validation';
import { studentValidations } from './student.zod.validation';
import auth from '../../middlewares/auth';
const router = express.Router();

//will call controller func

router.get(
  '/',
  auth('admin', 'faculty', 'student'),
  StudentControllers.getAllStudents,
);

router.get(
  '/:studentId',
  auth('admin', 'faculty', 'student'),
  StudentControllers.getSingleStudent,
);
router.patch(
  '/:studentId',
  auth('admin', 'faculty', 'student'),
  validateRequest(studentValidations.updateStudentValidationSchema),
  StudentControllers.updateStudent,
);
router.delete('/:studentId', StudentControllers.deleteStudent);
export const StudentRoutes = router;
