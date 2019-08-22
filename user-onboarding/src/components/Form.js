import React from 'react';
import { Form, Field, withFormik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const UserForm = ({ values, touched, errors }) => {
  return (
    <div>
      <Form>
        <Field name='name' type='text' placeholder='Name' />
        {touched.name && errors.name && (
          <p>{errors.name}</p>
        )}
        <br />
        <Field name='email' type='text' placeholder='Email' />
        <br />
        {touched.email && errors.email && (
          <p>{errors.email}</p>
        )}
        <Field name='password' type='password' placeholder='Password' />
        {touched.password && errors.password && (
          <p>{errors.password}</p>
        )}
        <br />
        <label>
          <Field name='tos' type='checkbox' checked={values.tos} />
          Terms of Service
        </label>
        {touched.tos && errors.tos && (
          <p>{errors.tos}</p>
        )}
        <br />
        <button>Submit</button>
      </Form>
    </div>
  )
}

const FormikUserForm = withFormik({
  mapPropsToValues({ name, email, password, tos }) {
    return {
      name: name || '',
      email: email || '',
      password: password || '',
      tos: tos || false,
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required('Name required'),
    email: Yup.string().email().required('Not a valid email address'),
    password: Yup.string().required('Please enter your password'),
    tos: Yup.boolean().oneOf([true], 'Please agree with the Terms of Service to continue').required(),
  }),
})(UserForm);

export default FormikUserForm;