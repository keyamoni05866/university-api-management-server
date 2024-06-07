import { z } from 'zod';

const preRequisiteCoursesValidationSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().default(false).optional(),
});

const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'title is required' }),
    prefix: z.string({ required_error: 'prefix is required' }),
    code: z.number({ required_error: 'code is required' }),
    credits: z.number({ required_error: 'credits is required' }),
    preRequisiteCourses: z
      .array(preRequisiteCoursesValidationSchema)
      .optional(),
    isDeleted: z.boolean().default(false).optional(),
  }),
});

const updatePreRequisiteCoursesValidationSchema = z.object({
  course: z.string(),
});
const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    prefix: z.string().optional(),
    code: z.number().optional(),
    credits: z.number().optional(),
    preRequisiteCourses: z
      .array(updatePreRequisiteCoursesValidationSchema)
      .optional(),
    isDeleted: z.boolean().default(false).optional(),
  }),
});

const facultyWithCourseValidation = z.object({
  body: z.object({
    course: z.string().optional(),
    faculties: z.array(z.string()),
  }),
});

export const CourseValidations = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
  facultyWithCourseValidation,
};
