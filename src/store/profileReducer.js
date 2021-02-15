import { request } from "../utils/request";
import { appActions } from "./appReducer";

const SET_USER_INFO = 'PROFILE/SET_USER_DATA';
const SET_EDIT_MODE = 'PROFILE/SET_EDIT_MODE';

const initialState = {
  user: {},
  editMode: false
}

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_INFO:
      return {
        ...state,
        user: action.paylode
      }
    case SET_EDIT_MODE:
      return {
        ...state,
        editMode: action.paylode
      }
    default:
      return state;
  }
}

export const profileActions = {
  setUserInfo: (userData) => ({ type: SET_USER_INFO, paylode: userData }),
  setEditMode: (editMode) => ({ type: SET_EDIT_MODE, paylode: editMode })
}

export const setUserData = (userId, token) => async (dispatch) => {
  dispatch(appActions.setLoader(true));
  dispatch(appActions.cleanErrors())

  try {
    const response = await request(`api/profile/home/${userId}`, token);
    const data = await response.json();

    if (!response.ok) {
      dispatch(appActions.setErrors(data.error));
    } else {
      dispatch(profileActions.setUserInfo(data.user));
    }

  } catch (err) {
    dispatch(appActions.setErrors({ general: 'Что-то пошло не так...' }))
  }

  dispatch(appActions.setLoader(false));
}

export const updateUserData = (userData, token) => async (dispatch) => {
  dispatch(appActions.setLoader(true));
  dispatch(appActions.cleanErrors());

  try {
    const response = await request(`api/profile/home/update`, token, 'POST', { ...userData });
    const data = await response.json();

    if (!response.ok) {
      dispatch(appActions.setErrors(data.error));
    } else {
      dispatch(profileActions.setUserInfo(data.updatedUser));
    }
    
  } catch (err) {
    dispatch(appActions.setErrors({ general: 'Что-то пошло не так...' }))
  }

  dispatch(appActions.setLoader(false));
}