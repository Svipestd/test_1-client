import { request } from "../utils/request";
import { appActions } from "./appReducer";
import { profileActions } from "./profileReducer";

const AUTH_LOGIN = 'AUTH/LOGIN';
const AUTH_LOGOUT = 'AUTH/LOGOUT';

let initialState = {
  user: {}
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOGIN:
      return {
        ...state,
        user: action.paylode
      }
    case AUTH_LOGOUT:
      return {
        ...state,
        user: {}
      }
    default:
      return state;
  }
}

export const authActions = {
  login: (userData) => ({ type: AUTH_LOGIN, paylode: userData }),
  logout: () => ({ type: AUTH_LOGOUT })
}

export const login = ({ username, password }) => async (dispatch) => {
  dispatch(appActions.setLoader(true));
  dispatch(appActions.cleanErrors())

  try {
    const response = await request('api/auth/login', {}, "POST", { username, password })
    const data = await response.json();

    if (!response.ok) {
      dispatch(appActions.setErrors(data.error));
    } else {
      dispatch(authActions.login(data));
      localStorage.setItem('userData', JSON.stringify({ userId: data.userId, token: data.token }));
    }

  } catch (err) {
    dispatch(appActions.setErrors({ general: 'Что-то пошло не так...' }))
  }

  dispatch(appActions.setLoader(false));
}

export const register = ({ email, username, password, confirmPassword }) => async (dispatch) => {
  dispatch(appActions.setLoader(true));
  dispatch(appActions.cleanErrors());

  try {
    const response = await request('api/auth/register', {}, "POST", { email, username, password, confirmPassword })
    const data = await response.json();

    if (!response.ok) {
      dispatch(appActions.setErrors(data.errors));
    } else {
      dispatch(authActions.login(data))
      localStorage.setItem('userData', JSON.stringify({ userId: data.userId, token: data.token }));
    }

  } catch (err) {
    dispatch(appActions.setErrors({ general: 'Что-то пошло не так...' }))
  }

  dispatch(appActions.setLoader(false));
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('userData');
  dispatch(profileActions.setUserInfo({}))
  dispatch(authActions.logout());
}