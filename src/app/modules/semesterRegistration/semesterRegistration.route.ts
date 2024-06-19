import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { semesterRegistrationValidations } from './semesterRegistration.validation';
import { SemesterRegistrationControllers } from './semesterRegistration.controller';
import auth from '../../middlewares/auth';
const router = express.Router();

router.post(
  '/create-semester-registration',
  auth('admin'),
  validateRequest(
    semesterRegistrationValidations.createSemesterRegistrationValidation,
  ),
  SemesterRegistrationControllers.createSemesterRegistration,
);
router.get(
  '/',
  auth('admin'),
  SemesterRegistrationControllers.getAllSemesterRegistration,
);
router.get(
  '/:id',
  auth('admin'),
  SemesterRegistrationControllers.getSingleSemesterRegistration,
);
router.patch(
  '/:id',
  auth('admin'),
  validateRequest(
    semesterRegistrationValidations.updateSemesterRegistrationValidation,
  ),
  SemesterRegistrationControllers.updateSemesterRegistration,
);
export const SemesterRegistrationRoutes = router;
