import * as yup from 'yup';

export const createValidationSchemaUser = yup.object({
  name: yup.string().min(3).required('Name is required'),
  email: yup
    .string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Invalid email format',
    )
    .required('Email is required'),
  phone: yup
    .string()
    .matches(/^\(\d{2}\)\d{5}-\d{4}$/, 'Invalid phone format')
    .required('Phone is required'),
    password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required')
});
