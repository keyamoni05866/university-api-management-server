import express from 'express';
import { AcademicSemesterControllers } from './academicSemesterController';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidations } from './academicSemester.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-academic-semester',
  auth('admin', 'faculty'),
  validateRequest(AcademicSemesterValidations.createAcademicSemesterSchema),
  AcademicSemesterControllers.createAcademicSemester,
);
router.get(
  '/',
  auth('admin', 'faculty'),
  AcademicSemesterControllers.getAllAcademicSemesterData,
);
router.get(
  '/:semesterId',
  auth('admin', 'faculty'),
  AcademicSemesterControllers.getSingleSemester,
);

export const academicRoutes = router;
