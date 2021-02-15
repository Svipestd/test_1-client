const SET_LOADER = 'APP/TOGGLE_LOADER';
const SET_ERRORS = 'APP/SET_ERRORS';
const CLEAN_ERRORS = 'APP/CLEAN_ERRORS'

const initialState = {
  isLoading: false,
  errors: []
}

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADER:
      return {
        ...state,
        isLoading: action.paylode
      }
    case SET_ERRORS:
      return {
        ...state,
        errors: [action.paylode]
      }
    case CLEAN_ERRORS:
      return {
        ...state,
        errors: []
      }
    default:
      return state;
  }
}

export const appActions = {
  setLoader: (isLoading) => ({ type: SET_LOADER, paylode: isLoading }),
  setErrors: (errors) => ({ type: SET_ERRORS, paylode: errors }),
  cleanErrors: () => ({ type: CLEAN_ERRORS })
}
