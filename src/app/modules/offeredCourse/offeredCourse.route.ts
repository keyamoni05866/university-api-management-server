import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { offeredCourseValidations } from './offeredCourse.validation';
import { OfferedCourseControllers } from './offeredCourse.controller';
import auth from '../../middlewares/auth';
const router = express.Router();

router.post(
  '/create-offeredCourse',
  auth('admin', 'faculty'),
  validateRequest(offeredCourseValidations.createOfferedCourseValidations),
  OfferedCourseControllers.createOfferedCourse,
);
router.get(
  '/',
  auth('admin', 'faculty', 'student'),
  OfferedCourseControllers.getAllOfferedCourse,
);
router.get(
  '/:id',
  auth('admin', 'faculty', 'student'),
  OfferedCourseControllers.getSingleOfferedCourse,
);
router.patch(
  '/:id',
  auth('admin', 'faculty'),
  OfferedCourseControllers.updateOfferedCourse,
);

export const OfferedCourseRoutes = router;
