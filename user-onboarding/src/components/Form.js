import React from 'react';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const UserForm = ({ values }) => {
  return (
    <div>
      <Form>
        <Field name='name' type='text' placeholder='Name' />
        <Field name='email' type='text' placeholder='Email' />
        <Field name='password' type='password' placeholder='Password' />
        <label>
          <Field name='tos' type='checkbox' checked={values.tos} />
          Terms of Service
        </label>
        <button>Submit</button>
      </Form>
    </div>
  )
}

const FormikUserForm = withFormik({
  mapPropsToValues({}) {

  }
})(UserForm);

export default FormikUserForm;