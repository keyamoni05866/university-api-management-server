import { z } from 'zod';

// Zod schema for student name
const createUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First Name is required' })
    .max(20, { message: 'The length should be 20' }),
  middleName: z.string().optional(),
  lastName: z.string().min(1, { message: 'Last Name is required' }),
});

// Zod schema for guardian
const createGuardianValidationSchema = z.object({
  fatherName: z.string().min(1, { message: 'Father Name is required' }),
  fatherOccupasion: z.string().optional(),
  fatherContactNo: z
    .string()
    .min(1, { message: 'Father Contact No is required' }),
  motherName: z.string().min(1, { message: 'Mother Name is required' }),
  motherOccupasion: z.string().optional(),
  motherContactNo: z
    .string()
    .min(1, { message: 'Mother Contact No is required' }),
});

// Zod schema for localGuardian
const createLocalGuardianValidationSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  occupation: z.string().optional(),
  contactNo: z.string().min(1, { message: 'Contact No is required' }),
  address: z.string().min(1, { message: 'Address is required' }),
});

// Main Zod schema for student
const createStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: createUserNameValidationSchema,
      gender: z.enum(['Male', 'Female', 'Other'], {
        errorMap: () => ({ message: '{VALUE} is not valid' }),
      }),
      dateOfBirth: z.string().optional(),
      email: z.string().email({ message: 'Invalid email address' }),
      contactNo: z.string().min(1, { message: 'Contact No is required' }),
      emargencyContactNo: z
        .string()
        .min(1, { message: 'Emergency Contact No is required' }),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z
        .string()
        .min(1, { message: 'Present Address is required' }),
      permanentAddress: z
        .string()
        .min(1, { message: 'Permanent Address is required' }),
      gurdian: createGuardianValidationSchema,
      localGurdian: createLocalGuardianValidationSchema,
      profileImg: z.string().url().optional(),
      admissionSemester: z.string(),
      academicDepartment: z.string(),
      isDeleted: z.boolean().default(false).optional(),
    }),
  }),
});

///updated validations start now

const updateUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20, { message: 'The length should be 20' })
    .optional(),
  middleName: z.string().optional(),
  lastName: z.string().min(1).max(20).optional(),
});

// Zod schema for guardian
const updateGuardianValidationSchema = z.object({
  fatherName: z.string().min(1).optional(),
  fatherOccupasion: z.string().optional(),
  fatherContactNo: z.string().min(1).optional(),
  motherName: z.string().min(1).optional(),
  motherOccupasion: z.string().optional(),
  motherContactNo: z.string().min(1).optional(),
});

// Zod schema for localGuardian
const updateLocalGuardianValidationSchema = z.object({
  name: z.string().min(1).optional(),
  occupation: z.string().optional(),
  contactNo: z.string().min(1).optional(),
  address: z.string().min(1).optional(),
});

// Main Zod schema for student
const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateUserNameValidationSchema.optional(),
      gender: z
        .enum(['Male', 'Female', 'Other'], {
          errorMap: () => ({ message: '{VALUE} is not valid' }),
        })
        .optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email({ message: 'Invalid email address' }).optional(),
      contactNo: z.string().min(1).optional(),
      emargencyContactNo: z.string().min(1).optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().min(1).optional(),
      permanentAddress: z.string().min(1).optional(),
      gurdian: updateGuardianValidationSchema.optional(),
      localGurdian: updateLocalGuardianValidationSchema.optional(),
      profileImg: z.string().url().optional(),
      admissionSemester: z.string().optional(),
      academicDepartment: z.string().optional(),
      isDeleted: z.boolean().default(false).optional(),
    }),
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
