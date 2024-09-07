import { z } from 'zod';

const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic department must be string',
      required_error: 'Name is require',
    }),
    academicFaculty: z.string({
      invalid_type_error: 'Academic department must be string',
      required_error: 'Faculty is require',
    }),
  }),
});

const updateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Academic department must be string',
        required_error: 'Name is require',
      })
      .optional(),
    academicFaculty: z
      .string({
        invalid_type_error: 'Academic department must be string',
        required_error: 'Faculty is require',
      })
      .optional(),
  }),
});

export const AcademicDepartmentValidation = {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
};
