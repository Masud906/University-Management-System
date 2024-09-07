import express from 'express';
import { AdminValidations } from '../Admin/admin.validation';
import {
  // createFacultyValidationSchema,
  studentValidations,
} from '../Faculty/faculty.validation';
// import { createStudentValidationSchema } from './../student/student.validation';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlwares/validateRequest';
import { studentvalidations } from '../student/student.validation';
import auth from '../../middlwares/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

router.post(
  '/create-student',
  auth(USER_ROLE.admin),
  validateRequest(studentvalidations.createStudentvalidationSchema),
  UserControllers.createStudent,
);

router.post(
  '/create-faculty',
  auth(USER_ROLE.admin),
  validateRequest(studentValidations.createFacultyValidationSchema),
  UserControllers.createFaculty,
);

router.post(
  '/create-admin',
  // auth(USER_ROLE.admin),
  validateRequest(AdminValidations.createAdminValidationSchema), ///user route/////////
  UserControllers.createAdmin,
);

export const UserRoutes = router;
