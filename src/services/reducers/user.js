import {
  CHECK_AUTHORISATION,
  FORGOT_PASSWORD_FAILED,
  FORGOT_PASSWORD_LOADING,
  FORGOT_PASSWORD_SUCCESS,
  GET_USER_FAILED,
  GET_USER_LOADING,
  GET_USER_SUCCESS,
  LOGIN_USER_FAILED,
  LOGIN_USER_LOADING,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_FAILED,
  LOGOUT_USER_LOADING,
  LOGOUT_USER_SUCCESS,
  REGISTER_USER_FAILED,
  REGISTER_USER_LOADING,
  REGISTER_USER_SUCCESS,
  RESTORE_PASSWORD_FAILED,
  RESTORE_PASSWORD_LOADING,
  RESTORE_PASSWORD_SUCCESS,
  UPDATE_USER_FAILED,
  UPDATE_USER_LOADING,
  UPDATE_USER_SUCCESS,
} from "../actions/user";

const initialState = {
  authorisationFailed: false,
  authorisationProcessing: false,
  authorisationChecked: false,
  fetchingUserDataProcessing: false,
  fetchingUserDataFailed: false,
  registrationFailed: false,
  registrationProcessing: false,
  logoutFailed: false,
  logoutProcessing: false,
  forgotPasswordProcessing: false,
  forgotPasswordSuccess: false,
  forgotPasswordFailed: false,
  restorePasswordProcessing: false,
  restorePasswordFailed: false,
  updatingInfoFailed: false,
  updatingInfoProcessing: false,
  userAccessToken: "",
  userAuthorised: false,
  userEmail: "",
  userName: "",
  userRefreshToken: "",
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHECK_AUTHORISATION: {
      return {
        ...state,
        authorisationChecked: true,
      };
    }
    case GET_USER_LOADING: {
      return {
        ...state,
        fetchingUserDataProcessing: true,
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        fetchingUserDataProcessing: false,
        fetchingUserDataFailed: false,
        userAuthorised: true,
        userEmail: action.userEmail,
        userName: action.userName,
      };
    }
    case GET_USER_FAILED: {
      return {
        ...state,
        fetchingUserDataProcessing: false,
        fetchingUserDataFailed: true,
      };
    }
    case REGISTER_USER_LOADING: {
      return {
        ...state,
        registrationProcessing: true,
      };
    }
    case REGISTER_USER_SUCCESS: {
      return {
        ...state,
        registrationProcessing: false,
        registrationFailed: false,
      };
    }
    case REGISTER_USER_FAILED: {
      return {
        ...state,
        registrationProcessing: false,
        registrationFailed: true,
      };
    }
    case LOGIN_USER_LOADING: {
      return {
        ...state,
        authorisationProcessing: true,
      };
    }
    case LOGIN_USER_SUCCESS: {
      return {
        ...state,
        authorisationProcessing: false,
        authorisationFailed: false,
        userAuthorised: true,
        userEmail: action.userEmail,
        userName: action.userName,
        userAccessToken: action.userAccessToken,
      };
    }
    case LOGIN_USER_FAILED: {
      return {
        ...state,
        authorisationProcessing: false,
        authorisationFailed: true,
      };
    }
    case LOGOUT_USER_LOADING: {
      return {
        ...state,
        logoutProcessing: true,
      };
    }
    case LOGOUT_USER_SUCCESS: {
      return {
        ...state,
        logoutProcessing: false,
        userAccessToken: "",
        userAuthorised: false,
        userEmail: "",
        userName: "",
        userRefreshToken: "",
        authorisationChecked: false,
      };
    }
    case LOGOUT_USER_FAILED: {
      return {
        ...state,
        logoutProcessing: false,
        logoutFailed: true,
      };
    }
    case UPDATE_USER_LOADING: {
      return {
        ...state,
        updatingInfoProcessing: true,
      };
    }
    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        userEmail: action.userEmail,
        userName: action.userName,
        updatingInfoProcessing: false,
        updatingInfoFailed: false,
      };
    }
    case UPDATE_USER_FAILED: {
      return {
        ...state,
        updatingInfoFailed: true,
      };
    }
    case FORGOT_PASSWORD_LOADING: {
      return {
        ...state,
        forgotPasswordProcessing: true,
      };
    }
    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        forgotPasswordProcessing: false,
        forgotPasswordSuccess: true,
        forgotPasswordFailed: false,
      };
    }
    case FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        forgotPasswordProcessing: false,
        forgotPasswordSuccess: false,
        forgotPasswordFailed: true,
      };
    }
    case RESTORE_PASSWORD_LOADING: {
      return {
        ...state,
        restorePasswordProcessing: true,
      };
    }
    case RESTORE_PASSWORD_SUCCESS: {
      return {
        ...state,
        restorePasswordProcessing: false,
        restorePasswordFailed: false,
      };
    }
    case RESTORE_PASSWORD_FAILED: {
      return {
        ...state,
        restorePasswordProcessing: false,
        restorePasswordFailed: false,
      };
    }
    default: {
      return state;
    }
  }
};
