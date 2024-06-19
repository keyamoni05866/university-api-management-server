import express from 'express';

import validateRequest from '../../middlewares/validateRequest';

import { AcademicDepartmentValidations } from './academicDepartment.validation';
import { AcademicDepartmentControllers } from './academicDepartment.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-academic-department',
  auth('admin'),
  validateRequest(
    AcademicDepartmentValidations.createAcademicDepartmentValidation,
  ),
  AcademicDepartmentControllers.createAcademicDepartment,
);
router.get('/', AcademicDepartmentControllers.getAllAcademicDepartment);
router.get(
  '/:departmentId',
  AcademicDepartmentControllers.getSingleAcademicDepartment,
);
router.patch(
  '/:departmentId',
  auth('admin'),
  validateRequest(
    AcademicDepartmentValidations.updateAcademicDepartmentValidation,
  ),
  AcademicDepartmentControllers.updateDepartment,
);

export const AcademicDepartmentRoutes = router;
