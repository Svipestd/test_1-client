import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { login } from '../store/authReducer';
import { appActions } from '../store/appReducer';
import { validateLoginInput } from '../utils/validators';
import { Errors } from '../components/Errors';

import { Button, Form } from 'semantic-ui-react';

const LoginForm = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.app.isLoading);
  const requestErrors = useSelector(state => state.app.errors);

  const [loginValues, setLoginValues] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState([]);

  const onChange = (event) => {
    setLoginValues({ ...loginValues, [event.target.name]: event.target.value })
  }

  const loginHanler = () => {
    dispatch(appActions.cleanErrors());

    const validateErrors = validateLoginInput({ ...loginValues });

    if (validateErrors.length > 0) {
      setErrors(validateErrors);
    } else {
      setErrors([]);
      dispatch(login(loginValues));
    }

    setLoginValues({ username: '', password: '' })
  }

  return (
    <>
      <Form>
        <Form.Input
          name='username'
          type='text'
          label='Username'
          placeholder="Username.."
          onChange={onChange}
          value={loginValues.username}
        />
        <Form.Input
          name='password'
          type='password'
          label='Password'
          placeholder="Password.."
          onChange={onChange}
          value={loginValues.password}
        />
        <Button
          type='submit'
          onClick={loginHanler}
          disabled={isLoading} primary>
          Login
      </Button>
      </Form>

      {errors.length > 0 && <Errors errors={errors} /> }
      {requestErrors.length > 0 && <Errors errors={requestErrors} /> }

      <div className='ui info message'>
        Для быстрого входа:
        <div>Username: User</div> 
        <div>Password: 123456</div>
      </div>
    </>
  )
}

export default LoginForm;
