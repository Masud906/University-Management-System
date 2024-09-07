import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();

//will call controller function

router.get('/', StudentController.getAllStudents);

router.patch('/:id', StudentController.updateStudent);

router.get('/:id', StudentController.getSingleStudent);

router.delete('/:id', StudentController.deleteStudent);

export const StudentRoutes = router;
