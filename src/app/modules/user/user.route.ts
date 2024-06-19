import express from 'express';
import { UserControllers } from './user.controller';

import { studentValidations } from './../student/student.zod.validation';
import validateRequest from '../../middlewares/validateRequest';
import { facultyValidations } from '../Faculty/faculty.validation';
import { createAdminValidationSchema } from '../Admin/admin.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(studentValidations.createStudentValidationSchema),
  auth(USER_ROLE.admin),
  UserControllers.createStudent,
);

router.post(
  '/create-faculty',
  validateRequest(facultyValidations.createFacultyValidationSchema),
  auth(USER_ROLE.admin),
  UserControllers.createFaculty,
);

router.post(
  '/create-admin',
  validateRequest(createAdminValidationSchema),
  UserControllers.createAdmin,
);

export const UserRoutes = router;
