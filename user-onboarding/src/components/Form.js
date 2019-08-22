import React, { useState, useEffect } from 'react';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import styled from 'styled-components';

const FormCard = styled.div`
  background-color: #9ec5ab;
  width: 61.8%;
  margin: 2rem auto;
  padding-bottom: 3rem;
  border-radius: 2rem;
  border-bottom: 0.5rem solid #104f55;
`;

const StyledHeader = styled.h1`
  background-color: #01200f;
  color: #9ec5ab;
  margin-bottom: 1rem;
  padding: 2rem;
  text-align: center;
  font-size: 3.6rem;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
`;

const FormWrapper = styled.div`
  width: 61.8%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding-bottom: 1.5rem;

  .form-field {
    width: 100%;
    min-width: 100%;
    padding: 1.5rem;
    margin-top: 1.5rem;
    font-family: 'Lexend Deca', sans-serif;
    font-size: 1.8rem;
    color: #011502;
  }

  p {
    color: red;
    padding: 0.5rem 0 0 0.5rem;
    font-size: 1.4rem;
  }

  label {
    display: block;
    margin-top: 1.5rem;
    margin-left: 1.5rem;
    font-size: 1.4rem;
    color: #011502;
  }

  button {
    width: 100%;
    margin-top: 1.5rem;
    padding: 1rem;
    font-family: 'Lexend Deca', sans-serif;
    font-size: 1.8rem;
    border: 0.3rem solid #104f55;
    background-color: #104f55;
    color: #9ec5ab;
    cursor: pointer;
    outline: none;

    &:hover {
      background-color: #9ec5ab;
      color: #104f55;
    }
  }
`;

const UsersDiv = styled.div`
  width: 61.8%;
  margin: 0 auto;
  padding: 1.5rem;

  li {
    list-style-type: none;
    font-size: 1.8rem;
    color: #011502;
    margin-bottom: 2rem;
  }
`;

const UserForm = ({ values, touched, errors, status }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (status) {
      setUsers([...users, status]);
    }
  }, [status]);

  return (
    <FormCard>
      <StyledHeader>CodeMentors</StyledHeader>
      <FormWrapper>
        <Form>
          <Field name='name' type='text' placeholder='Name' className='form-field' />
          {touched.name && errors.name && (
            <p>{errors.name}</p>
          )}
          <br />
          <Field name='email' type='text' placeholder='Email' className='form-field' />
          <br />
          {touched.email && errors.email && (
            <p>{errors.email}</p>
          )}
          <Field name='password' type='password' placeholder='Password' className='form-field' />
          {touched.password && errors.password && (
            <p>{errors.password}</p>
          )}
          <br />
          <Field component='select' name='role' className='form-field' >
            <option>Please select your role:</option>
            <option value='mentor'>Mentor</option>
            <option value='mentee'>Mentee</option>
          </Field>
          {touched.role && errors.role && (
            <p>{errors.role}</p>
          )}
          <br />
          <Field name='location' type='text' placeholder='Location' className='form-field' />
          {touched.location && errors.location && (
            <p>{errors.location}</p>
          )}
          <br />
          <Field name='language' component='textarea' type='text' placeholder='Programming language(s)' className='form-field' />
          <br />
          <Field name='about' component='textarea' type='text' placeholder='Tell us a little about yourself...' className='form-field' />
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
      </FormWrapper>
      <UsersDiv>
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.name} is a {user.role} from {user.location}!</li>
          ))}
        </ul>
      </UsersDiv>
    </FormCard>
  )
}

const FormikUserForm = withFormik({
  mapPropsToValues({ name, email, password, role, location, language, about, tos }) {
    return {
      name: name || '',
      email: email || '',
      password: password || '',
      role: role || '',
      location: location || '',
      language: language || '',
      about: about || '',
      tos: tos || false,
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required('Name required'),
    email: Yup.string().email().required('Not a valid email address'),
    password: Yup.string().required('Please enter your password'),
    role: Yup.string().required('Please select an option'),
    location: Yup.string().required('Please enter your location'),
    language: Yup.string().required('Please complete this section'),
    about: Yup.string(),
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