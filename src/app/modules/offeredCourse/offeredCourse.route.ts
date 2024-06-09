import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { offeredCourseValidations } from './offeredCourse.validation';
import { OfferedCourseControllers } from './offeredCourse.controller';
const router = express.Router();

router.post(
  '/create-offeredCourse',
  validateRequest(offeredCourseValidations.createOfferedCourseValidations),
  OfferedCourseControllers.createOfferedCourse,
);
router.get('/', OfferedCourseControllers.getAllOfferedCourse);
router.get('/:id', OfferedCourseControllers.getSingleOfferedCourse);
router.patch('/:id', OfferedCourseControllers.updateOfferedCourse);

export const OfferedCourseRoutes = router;
