import express from 'express';
import validateRequest from '../../middlwares/validateRequest';
import { AcademicSemesterControllers } from './academicSemester.controller';
import { AcademicSemesterValidations } from './academicSemester.validation';
import auth from '../../middlwares/auth';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(
    AcademicSemesterValidations.createAcdemicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.createAcademicSemester,
);

router.get('/:courseId', AcademicSemesterControllers.createAcademicSemester);

router.patch(
  '/:courseId',
  validateRequest(
    AcademicSemesterValidations.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.updateAcademicSemester,
);

router.get('/', auth(), AcademicSemesterControllers.getAllAcademicSemesters);

export const AcademicSemesterRoutes = router;
