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
} from "../constants";
import { deleteCookie, getCookie, setCookie } from "../../utils/helpers";
import {
  restorePassword,
  saveNewPassword,
  signIn,
  signOut,
  signUp,
  updateUserData,
  fetchUserData,
} from "../../utils/api";
import { TAccessToken, TUser } from "../types/data";
import { AppDispatch } from "../types";

export interface IGetUserLoadingAction {
  readonly type: typeof GET_USER_LOADING;
}

export interface IGetUserSuccessAction {
  readonly type: typeof GET_USER_SUCCESS;
  readonly user: TUser;
}

export interface IGetUserFailedAction {
  readonly type: typeof GET_USER_FAILED;
}

export interface ILoginUserLoadingAction {
  readonly type: typeof LOGIN_USER_LOADING;
}

export interface ILoginUserSuccessAction {
  readonly type: typeof LOGIN_USER_SUCCESS;
  readonly user: TUser;
  readonly accessToken: TAccessToken;
}

export interface ILoginUserFailedAction {
  readonly type: typeof LOGIN_USER_FAILED;
}

export interface ILogoutUserLoadingAction {
  readonly type: typeof LOGOUT_USER_LOADING;
}

export interface ILogoutUserSuccessAction {
  readonly type: typeof LOGOUT_USER_SUCCESS;
}

export interface ILogoutUserFailedAction {
  readonly type: typeof LOGOUT_USER_FAILED;
}

export interface IRegisterUserLoadingAction {
  readonly type: typeof REGISTER_USER_LOADING;
}

export interface IRegisterUserSuccessAction {
  readonly type: typeof REGISTER_USER_SUCCESS;
}

export interface IRegisterUserFailedAction {
  readonly type: typeof REGISTER_USER_FAILED;
}

export interface IUpdateUserLoadingAction {
  readonly type: typeof UPDATE_USER_LOADING;
}

export interface IUpdateUserSuccessAction {
  readonly type: typeof UPDATE_USER_SUCCESS;
  readonly user: TUser;
}

export interface IUpdateUserFailedAction {
  readonly type: typeof UPDATE_USER_FAILED;
}

export interface IForgotPasswordLoadingAction {
  readonly type: typeof FORGOT_PASSWORD_LOADING;
}

export interface IForgotPasswordSuccessAction {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}

export interface IForgotPasswordFailedAction {
  readonly type: typeof FORGOT_PASSWORD_FAILED;
}

export interface IRestorePasswordLoadingAction {
  readonly type: typeof RESTORE_PASSWORD_LOADING;
}

export interface IRestorePasswordSuccessAction {
  readonly type: typeof RESTORE_PASSWORD_SUCCESS;
}

export interface IRestorePasswordFailedAction {
  readonly type: typeof RESTORE_PASSWORD_FAILED;
}

export interface ICheckAuthorisationAction {
  readonly type: typeof CHECK_AUTHORISATION;
}

export type TUserActions =
  | IGetUserLoadingAction
  | IGetUserSuccessAction
  | IGetUserFailedAction
  | ILoginUserLoadingAction
  | ILoginUserSuccessAction
  | ILoginUserFailedAction
  | ILogoutUserLoadingAction
  | ILogoutUserSuccessAction
  | ILogoutUserFailedAction
  | IRegisterUserLoadingAction
  | IRegisterUserSuccessAction
  | IRegisterUserFailedAction
  | IUpdateUserLoadingAction
  | IUpdateUserSuccessAction
  | IUpdateUserFailedAction
  | IForgotPasswordLoadingAction
  | IForgotPasswordSuccessAction
  | IForgotPasswordFailedAction
  | IRestorePasswordLoadingAction
  | IRestorePasswordSuccessAction
  | IRestorePasswordFailedAction
  | ICheckAuthorisationAction;

export const getUserLoadingAction = (): IGetUserLoadingAction => ({
  type: GET_USER_LOADING,
});

export const getUserSuccessAction = (user: TUser): IGetUserSuccessAction => ({
  type: GET_USER_SUCCESS,
  user,
});

export const getUserFailedAction = (): IGetUserFailedAction => ({
  type: GET_USER_FAILED,
});

export const loginUserLoadingAction = (): ILoginUserLoadingAction => ({
  type: LOGIN_USER_LOADING,
});

export const loginUserSuccessAction = (
  user: TUser,
  accessToken: TAccessToken
): ILoginUserSuccessAction => ({
  type: LOGIN_USER_SUCCESS,
  user,
  accessToken,
});

export const loginUserFailedAction = (): ILoginUserFailedAction => ({
  type: LOGIN_USER_FAILED,
});

export const logoutUserLoadingAction = (): ILogoutUserLoadingAction => ({
  type: LOGOUT_USER_LOADING,
});

export const logoutUserSuccessAction = (): ILogoutUserSuccessAction => ({
  type: LOGOUT_USER_SUCCESS,
});

export const logoutUserFailedAction = (): ILogoutUserFailedAction => ({
  type: LOGOUT_USER_FAILED,
});

export const registerUserLoadingAction = (): IRegisterUserLoadingAction => ({
  type: REGISTER_USER_LOADING,
});

export const registerUserSuccessAction = (): IRegisterUserSuccessAction => ({
  type: REGISTER_USER_SUCCESS,
});

export const registerUserFailedAction = (): IRegisterUserFailedAction => ({
  type: REGISTER_USER_FAILED,
});

export const updateUserLoadingAction = (): IUpdateUserLoadingAction => ({
  type: UPDATE_USER_LOADING,
});

export const updateUserSuccessAction = (
  user: TUser
): IUpdateUserSuccessAction => ({
  type: UPDATE_USER_SUCCESS,
  user,
});

export const updateUserFailedAction = (): IUpdateUserFailedAction => ({
  type: UPDATE_USER_FAILED,
});

export const forgotPasswordLoadingAction =
  (): IForgotPasswordLoadingAction => ({
    type: FORGOT_PASSWORD_LOADING,
  });

export const forgotPasswordSuccessAction =
  (): IForgotPasswordSuccessAction => ({
    type: FORGOT_PASSWORD_SUCCESS,
  });

export const forgotPasswordFailedAction = (): IForgotPasswordFailedAction => ({
  type: FORGOT_PASSWORD_FAILED,
});

export const restorePasswordLoadingAction =
  (): IRestorePasswordLoadingAction => ({
    type: RESTORE_PASSWORD_LOADING,
  });

export const restorePasswordSuccessAction =
  (): IRestorePasswordSuccessAction => ({
    type: RESTORE_PASSWORD_SUCCESS,
  });

export const restorePasswordFailedAction =
  (): IRestorePasswordFailedAction => ({
    type: RESTORE_PASSWORD_FAILED,
  });

export const checkAuthorisationAction = (): ICheckAuthorisationAction => ({
  type: CHECK_AUTHORISATION,
});

export const checkToken = () => (dispatch: AppDispatch) => {
  if (getCookie("accessToken")) {
    dispatch(getUserData());
    dispatch(checkAuthorisationAction());
  } else {
    dispatch(checkAuthorisationAction());
  }
};

export const getUserData = () => (dispatch: AppDispatch) => {
  dispatch(getUserLoadingAction());
  fetchUserData().then((response) => {
    if (response && response.success) {
      dispatch(getUserSuccessAction(response.user));
    } else {
      dispatch(getUserFailedAction());
    }
  });
};

export const registerUser =
  (email: string, password: string, name: string) =>
  (dispatch: AppDispatch) => {
    dispatch(registerUserLoadingAction());
    signUp(email, password, name).then((response) => {
      if (response) {
        dispatch(registerUserSuccessAction());
      } else {
        dispatch(registerUserFailedAction());
      }
    });
  };

export const authoriseUser =
  (email: string, password: string) => (dispatch: AppDispatch) => {
    dispatch(loginUserLoadingAction());
    signIn(email, password).then((response) => {
      if (response && response.success) {
        const { accessToken, refreshToken, user } = response;
        const extractedAccessToken = accessToken.split("Bearer ")[1];
        setCookie("accessToken", extractedAccessToken);
        setCookie("refreshToken", refreshToken);
        dispatch(loginUserSuccessAction(user, extractedAccessToken));
      } else {
        dispatch(loginUserFailedAction());
      }
    });
  };

export const logoutUser = () => (dispatch: AppDispatch) => {
  dispatch(logoutUserLoadingAction());
  signOut().then((response) => {
    if (response && response.success) {
      dispatch(logoutUserSuccessAction());
      deleteCookie("refreshToken");
      deleteCookie("accessToken");
    } else {
      dispatch(logoutUserFailedAction());
    }
  });
};

export const updateUser =
  (newName: string, newLogin: string, newPassword: string) =>
  (dispatch: AppDispatch) => {
    dispatch(updateUserLoadingAction());
    updateUserData(newName, newLogin, newPassword).then((response) => {
      if (response && response.success) {
        const { user } = response;
        dispatch(updateUserSuccessAction(user))
      } else {
        dispatch(updateUserFailedAction());
      }
    });
  };

export const requestForNewPassword =
  (userEmail: string) => (dispatch: AppDispatch) => {
    dispatch(forgotPasswordLoadingAction());
    restorePassword(userEmail).then((response) => {
      if (response) {
        dispatch(forgotPasswordSuccessAction());
      } else {
        dispatch(forgotPasswordFailedAction());
      }
    });
  };

export const restoreWithNewPassword =
  (newPassword: string, codeFromLetter: string) =>
  (dispatch: AppDispatch) => {
    dispatch(restorePasswordLoadingAction());
    saveNewPassword(newPassword, codeFromLetter).then((response) => {
      if (response) {
        dispatch(restorePasswordSuccessAction());
      } else {
        dispatch(restorePasswordFailedAction());
      }
    });
  };
