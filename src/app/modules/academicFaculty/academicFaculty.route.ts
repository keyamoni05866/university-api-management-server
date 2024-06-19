import express from 'express';
import { AcademicFacultyControllers } from './academicFaculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyValidations } from './academicFaculty.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  auth('admin'),
  validateRequest(AcademicFacultyValidations.createAcademicFacultyValidation),
  AcademicFacultyControllers.createAcademicFaculty,
);
router.get(
  '/',
  auth('admin'),
  AcademicFacultyControllers.getAllAcademicFaculty,
);
router.get(
  '/:facultyId',
  auth('admin'),
  AcademicFacultyControllers.getSingleAcademicFaculty,
);

export const AcademicFacultyRoutes = router;
