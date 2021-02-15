import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { appActions } from '../store/appReducer';
import { register } from '../store/authReducer';
import { validateRegisterInput } from '../utils/validators';
import { Errors } from './Errors';

import { Button, Form } from 'semantic-ui-react';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const requestErrors = useSelector(state => state.app.errors);
  const isLoading = useSelector(state => state.app.isLoading);

  const [registerValues, setRegisterValues] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState([]);

  const onChange = (event) => {
    setRegisterValues({ ...registerValues, [event.target.name]: event.target.value });
  }

  const registerHadler = () => {
    dispatch(appActions.cleanErrors());

    const validateErrors = validateRegisterInput({ ...registerValues });

    if (validateErrors.length > 0) {
      setErrors(validateErrors)
    } else {
      setErrors([]);
      dispatch(register(registerValues));
    }

    setRegisterValues({
      email: '',
      username: '',
      password: '',
      confirmPassword: ''
    })
  }
  
  return (
    <>
      <Form>
        <Form.Input
          name='email'
          type='email'
          label='Email'
          placeholder="Email.."
          onChange={onChange}
          value={registerValues.email}
        />
        <Form.Input
          name='username'
          type='text'
          label='Username'
          placeholder="Username.."
          onChange={onChange}
          value={registerValues.username}
        />
        <Form.Input
          name='password'
          type='password'
          label='Password'
          placeholder="Password.."
          onChange={onChange}
          value={registerValues.password}
        />
        <Form.Input
          name='confirmPassword'
          type='password'
          label='Comfirm password'
          placeholder="Confirm password.."
          onChange={onChange}
          value={registerValues.confirmPassword}
        />
        <Button
          type='submit'
          onClick={registerHadler}
          disabled={isLoading} primary>
          Register
        </Button>
      </Form>

      {errors.length > 0 && <Errors errors={errors} />}
      {requestErrors.length > 0 && <Errors errors={requestErrors} />}
    </>
  )
}

export default RegisterForm;