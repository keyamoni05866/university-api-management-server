import express from 'express';
import { AcademicSemesterControllers } from './academicSemesterController';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidations } from './academicSemester.validation';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(AcademicSemesterValidations.createAcademicSemesterSchema),
  AcademicSemesterControllers.createAcademicSemester,
);
router.get('/', AcademicSemesterControllers.getAllAcademicSemesterData);
router.get('/:semesterId', AcademicSemesterControllers.getSingleSemester);

export const academicRoutes = router;
