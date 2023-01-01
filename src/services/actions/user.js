import { deleteCookie, setCookie } from "../../utils/helpers";
import {
  fetchUserData,
  getNewToken,
  restorePassword,
  saveNewPassword,
  signIn,
  signOut,
  signUp,
  updateUserData,
} from "../api";

export const GET_USER_LOADING = "GET_USER_LOADING";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILED = "GET_USER_FAILED";

export const REGISTER_USER_LOADING = "REGISTER_USER_LOADING";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAILED = "REGISTER_USER_FAILED";

export const LOGIN_USER_LOADING = "LOGIN_USER_LOADING";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILED = "LOGIN_USER_FAILED";

export const LOGOUT_USER_LOADING = "LOGOUT_USER_LOADING";
export const LOGOUT_USER_SUCCESS = "LOGOUT_USER_SUCCESS";
export const LOGOUT_USER_FAILED = "LOGOUT_USER_FAILED";

export const UPDATE_USER_LOADING = "UPDATE_USER_LOADING";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILED = "UPDATE_USER_FAILED";

export const REFRESH_TOKEN_LOADING = "REFRESH_TOKEN_LOADING";
export const REFRESH_TOKEN_SUCCESS = "REFRESH_TOKEN_SUCCESS";
export const REFRESH_TOKEN_FAILED = "REFRESH_TOKEN_FAILED";

export const FORGOT_PASSWORD_LOADING = "FORGOT_PASSWORD_LOADING";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILED = "FORGOT_PASSWORD_FAILED";

export const RESTORE_PASSWORD_LOADING = "RESTORE_PASSWORD_LOADING";
export const RESTORE_PASSWORD_SUCCESS = "RESTORE_PASSWORD_SUCCESS";
export const RESTORE_PASSWORD_FAILED = "RESTORE_PASSWORD_FAILED";

export const getUserData = (accessToken) => {
  return (dispatch) => {
    dispatch({ type: GET_USER_LOADING });
    fetchUserData(accessToken).then((response) => {
      if (response) {
        response.message === "jwt expired"
          ? (async () => {
              await dispatch(getNewAccessToken());
              await dispatch(getUserData(accessToken));
            })()
          : dispatch({
              type: GET_USER_SUCCESS,
              userEmail: response.user.email,
              userName: response.user.name,
            });
      } else {
        dispatch({ type: GET_USER_FAILED });
      }
    });
  };
};

export const registerUser = (email, password, name) => {
  return (dispatch) => {
    dispatch({ type: REGISTER_USER_LOADING });
    signUp(email, password, name).then((response) => {
      if (response) {
        dispatch({ type: REGISTER_USER_SUCCESS });
      } else {
        dispatch({ type: REGISTER_USER_FAILED });
      }
    });
  };
};

export const authoriseUser = (email, password) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER_LOADING });
    signIn(email, password).then((response) => {
      if (response) {
        const { accessToken, refreshToken } = response;
        const extractedAccessToken = accessToken.split("Bearer ")[1];
        setCookie("accessToken", extractedAccessToken);
        setCookie("refreshToken", refreshToken);
        dispatch({
          type: LOGIN_USER_SUCCESS,
          userEmail: response.user.email,
          userName: response.user.name,
          userAccessToken: extractedAccessToken,
        });
      } else {
        dispatch({ type: LOGIN_USER_FAILED });
      }
    });
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch({ type: LOGOUT_USER_LOADING });
    signOut().then((response) => {
      if (response) {
        dispatch({ type: LOGOUT_USER_SUCCESS });
        deleteCookie("refreshToken");
        deleteCookie("accessToken");
      } else {
        dispatch({ type: LOGOUT_USER_FAILED });
      }
    });
  };
};

export const updateUser = (accessToken, newName, newLogin, newPassword) => {
  return (dispatch) => {
    dispatch({ type: UPDATE_USER_LOADING });
    updateUserData(accessToken, newName, newLogin, newPassword).then(
      (response) => {
        if (response) {
          response.message === "jwt expired"
            ? (async () => {
                await dispatch(getNewAccessToken());
                await dispatch(
                  updateUser(accessToken, newName, newLogin, newPassword)
                );
              })()
            : dispatch({
                type: UPDATE_USER_SUCCESS,
                userEmail: response.user.email,
                userName: response.user.name,
              });
        } else {
          dispatch({ type: UPDATE_USER_FAILED });
        }
      }
    );
  };
};

export const getNewAccessToken = () => {
  return (dispatch) => {
    dispatch({ type: REFRESH_TOKEN_LOADING });
    getNewToken().then((response) => {
      if (response && response.success) {
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
        const { accessToken, refreshToken } = response;
        const extractedAccessToken = accessToken.split("Bearer ")[1];
        setCookie("accessToken", extractedAccessToken);
        setCookie("refreshToken", refreshToken);
        dispatch({
          type: REFRESH_TOKEN_SUCCESS,
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        });
      } else {
        dispatch({ type: REFRESH_TOKEN_FAILED });
      }
    });
  };
};

export const requestForNewPassword = (userEmail, history) => {
  return (dispatch) => {
    dispatch({ type: FORGOT_PASSWORD_LOADING });
    restorePassword(userEmail).then((response) => {
      if (response) {
        dispatch({ type: FORGOT_PASSWORD_SUCCESS });
        history.push("/reset-password");
      } else {
        dispatch({ type: FORGOT_PASSWORD_FAILED });
      }
    });
  };
};

export const restoreWithNewPassword = (
  newPassword,
  codeFromLetter,
  history
) => {
  return (dispatch) => {
    dispatch({ type: RESTORE_PASSWORD_LOADING });
    saveNewPassword(newPassword, codeFromLetter).then((response) => {
      if (response) {
        dispatch({ type: RESTORE_PASSWORD_SUCCESS });
        history.push("/login");
      } else {
        dispatch({ type: RESTORE_PASSWORD_FAILED });
      }
    });
  };
};
