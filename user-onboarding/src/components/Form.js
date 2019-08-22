import React, { useState, useEffect } from 'react';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const UserForm = ({ values, touched, errors, status }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (status) {
      setUsers([...users, status]);
    }
  }, [status]);

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
        <Field component='select' name='role'>
          <option>Please select your role below:</option>
          <option value='mentor'>Mentor</option>
          <option value='mentee'>Mentee</option>
        </Field>
        {touched.role && errors.role && (
          <p>{errors.role}</p>
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
      <div>
        {users.map(user => (
          <p key={user.id}>{user.name}{user.email}</p>
        ))}
      </div>
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

  handleSubmit(values, { resetForm, setErrors, setStatus }) {
    if (values.email === 'waffle@syrup.com') {
      setErrors({ email: 'That email is already taken' });
    } else {
      axios
        .post('https://reqres.in/api/users', values)
        .then(res => {
          console.log(res);
          setStatus(res.data);
          resetForm();
        })
        .catch(err => console.log(err));
    }
  }
})(UserForm);

export default FormikUserForm;