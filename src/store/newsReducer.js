import { request } from "../utils/request";
import { appActions } from "./appReducer";

const SET_NEWS = 'NEWS/SET_NEWS';

const initialState = {
  news: []
};

export const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NEWS:
      return {
        ...state,
        news: action.paylode
      }
    default:
      return state;
  }
}

export const newsActions = {
  setNews: (news) => ({ type: SET_NEWS, paylode: news }),
}

export const setNews = (token) => async (dispatch) => {
  dispatch(appActions.setLoader(true));
  dispatch(appActions.cleanErrors());

  try {
    const response = await request('api/news/', token);
    const data = await response.json();

    if (!response.ok) {
      dispatch(appActions.setErrors(data.error))
    } else {
      dispatch(newsActions.setNews(data.news))
    }

  } catch (err) {
    dispatch(appActions.setErrors({ general: 'Что-то пошло не так...' }))
  }

  dispatch(appActions.setLoader(false));
}

export const setNewNews = (newNews, token) => async (dispatch) => {
  dispatch(appActions.setLoader(true));
  dispatch(appActions.cleanErrors());

  try {
    const response = await request('api/news/create', token, 'POST', { ...newNews });
    const data = await response.json();

    if (!response.ok) {
      dispatch(appActions.setErrora(data.error));
    } else {
      dispatch(setNews(token));
    }

  } catch (err) {
    dispatch(appActions.setErrors({ general: 'Что-то пошло не так...' }))
  }

  dispatch(appActions.setLoader(false));
}

export const deleteNews = (newsId, token) => async (dispatch) => {
  dispatch(appActions.setLoader(true));
  dispatch(appActions.cleanErrors())

  try {
    const response = await request('api/news/delete', token, 'DELETE', { newsId });
    const data = response.json();

    if (!response.ok) {
      dispatch(appActions.setErrors(data.error))
    } else {
      dispatch(setNews(token));
    }

  } catch (err) {
    dispatch(appActions.setErrors({ general: 'Что-то пошло не так...' }))
  }
  
  dispatch(appActions.setLoader(false));
}