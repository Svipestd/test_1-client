import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { authActions } from '../store/authReducer';
import { checkAuth } from "../utils/checkAuth";
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

import { Tab } from "semantic-ui-react"

const Auth = () => {
  const dispatch = useDispatch()
  const userData = checkAuth();

  useEffect(() => {
    if (userData) {
      dispatch(authActions.login(userData));
    }
  }, [userData])
    
  return (
    <Tab panes={panes} renderActiveOnly={false} menuPosition='right' />
  )
}
export default Auth;

const panes = [
  {
    menuItem: 'Login',
    pane: {
      key: 'login',
      content: (
        <LoginForm />
      )
    }
  },
  {
    menuItem: 'Register',
    pane: {
      key: 'register',
      content: (
        <RegisterForm />
      )
    }
  }
]