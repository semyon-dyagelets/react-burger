import {
  checkAuthorisationAction,
  forgotPasswordFailedAction,
  forgotPasswordLoadingAction,
  forgotPasswordSuccessAction,
  getUserFailedAction,
  getUserLoadingAction,
  getUserSuccessAction,
  loginUserFailedAction,
  loginUserLoadingAction,
  loginUserSuccessAction,
  logoutUserFailedAction,
  logoutUserLoadingAction,
  logoutUserSuccessAction,
  registerUserFailedAction,
  registerUserLoadingAction,
  registerUserSuccessAction,
  restorePasswordFailedAction,
  restorePasswordLoadingAction,
  restorePasswordSuccessAction,
  updateUserFailedAction,
  updateUserLoadingAction,
  updateUserSuccessAction,
} from "../../actions/user";
import { initialState, userReducer } from "./user";

describe("User reducer", () => {
  it("should return initial state", () => {
    // @ts-ignore
    expect(userReducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("should handle checking authorisation", () => {
    const stateWithAuthorisationChecked = {
      ...initialState,
      authorisationChecked: true,
    };
    expect(userReducer(undefined, checkAuthorisationAction())).toEqual(
      stateWithAuthorisationChecked
    );
  });

  it("should handle getting user request", () => {
    const stateAtGetUserRequest = {
      ...initialState,
      fetchingUserDataProcessing: true,
    };
    expect(userReducer(undefined, getUserLoadingAction())).toEqual(
      stateAtGetUserRequest
    );
  });

  it("should handle getting user success", () => {
    const successfullUserResponse = {
      success: true,
      user: {
        email: "j.doe@hotmail.com",
        name: "John Doe",
      },
    };
    const stateAfterSuccess = {
      ...initialState,
      fetchingUserDataProcessing: false,
      fetchingUserDataFailed: false,
      userAuthorised: true,
      userEmail: "j.doe@hotmail.com",
      userName: "John Doe",
    };
    expect(
      userReducer(undefined, getUserSuccessAction(successfullUserResponse.user))
    ).toEqual(stateAfterSuccess);
  });

  it("should handle getting user failed", () => {
    const stateAfterError = {
      ...initialState,
      fetchingUserDataProcessing: false,
      fetchingUserDataFailed: true,
      userAuthorised: false,
    };
    expect(userReducer(undefined, getUserFailedAction())).toEqual(
      stateAfterError
    );
  });

  it("should handle registering user request", () => {
    const stateAtRegisterUserRequest = {
      ...initialState,
      registrationProcessing: true,
    };
    expect(userReducer(undefined, registerUserLoadingAction())).toEqual(
      stateAtRegisterUserRequest
    );
  });

  it("should handle registering user success", () => {
    const stateAfterRegistrationSuccess = {
      ...initialState,
      registrationProcessing: false,
      registrationFailed: false,
    };
    expect(userReducer(undefined, registerUserSuccessAction())).toEqual(
      stateAfterRegistrationSuccess
    );
  });

  it("should handle registering user failed", () => {
    const stateAfterError = {
      ...initialState,
      registrationProcessing: false,
      registrationFailed: true,
    };
    expect(userReducer(undefined, registerUserFailedAction())).toEqual(
      stateAfterError
    );
  });

  it("should handle login user request", () => {
    const stateAtLoginUserRequest = {
      ...initialState,
      authorisationProcessing: true,
    };
    expect(userReducer(undefined, loginUserLoadingAction())).toEqual(
      stateAtLoginUserRequest
    );
  });

  it("should handle login user success", () => {
    const successfullLoginResponse = {
      success: true,
      user: {
        email: "t.anderson@cortex.com",
        name: "Thomas A. Anderson",
      },
      accessToken: "Bearer f0ll0w.the.whiteRabbit",
      refreshToken: "nebuchadnezzar",
    };
    const stateAfterLoginSuccess = {
      ...initialState,
      authorisationProcessing: false,
      authorisationFailed: false,
      userAuthorised: true,
      userEmail: "t.anderson@cortex.com",
      userName: "Thomas A. Anderson",
      userAccessToken: "Bearer f0ll0w.the.whiteRabbit",
    };
    expect(
      userReducer(
        undefined,
        loginUserSuccessAction(
          successfullLoginResponse.user,
          successfullLoginResponse.accessToken
        )
      )
    ).toEqual(stateAfterLoginSuccess);
  });

  it("should handle login user failed", () => {
    const stateAfterError = {
      ...initialState,
      authorisationProcessing: false,
      authorisationFailed: true,
    };
    expect(userReducer(undefined, loginUserFailedAction())).toEqual(
      stateAfterError
    );
  });

  it("should handle logout user request", () => {
    const stateAtLogoutUserRequest = {
      ...initialState,
      logoutProcessing: true,
    };
    expect(userReducer(undefined, logoutUserLoadingAction())).toEqual(
      stateAtLogoutUserRequest
    );
  });

  it("should handle logout user success", () => {
    const stateAfterLogoutSuccess = {
      ...initialState,
      logoutProcessing: false,
      authorisationChecked: false,
      authorisationFailed: false,
      userAuthorised: false,
      userEmail: "",
      userName: "",
      userAccessToken: "",
    };
    expect(userReducer(undefined, logoutUserSuccessAction())).toEqual(
      stateAfterLogoutSuccess
    );
  });

  it("should handle logout user failed", () => {
    const stateAfterError = {
      ...initialState,
      logoutProcessing: false,
      logoutFailed: true,
    };
    expect(userReducer(undefined, logoutUserFailedAction())).toEqual(
      stateAfterError
    );
  });

  it("should handle update user request", () => {
    const stateAtUpdateUserRequest = {
      ...initialState,
      updatingInfoProcessing: true,
    };
    expect(userReducer(undefined, updateUserLoadingAction())).toEqual(
      stateAtUpdateUserRequest
    );
  });

  it("should handle update user success", () => {
    const successfullUpdateResponse = {
      success: true,
      user: {
        email: "neo@nebuchadnezzar.org",
        name: "Neo",
      },
    };
    const stateAfterUpdateSuccess = {
      ...initialState,
      updatingInfoProcessing: false,
      updatingInfoFailed: false,
      userEmail: "neo@nebuchadnezzar.org",
      userName: "Neo",
    };
    expect(
      userReducer(
        undefined,
        updateUserSuccessAction(successfullUpdateResponse.user)
      )
    ).toEqual(stateAfterUpdateSuccess);
  });

  it("should handle update user failed", () => {
    const stateAfterError = {
      ...initialState,
      updatingInfoProcessing: false,
      updatingInfoFailed: true,
    };
    expect(userReducer(undefined, updateUserFailedAction())).toEqual(
      stateAfterError
    );
  });

  it("should handle forgot password request", () => {
    const stateAtRequest = {
      ...initialState,
      forgotPasswordProcessing: true,
    };
    expect(userReducer(undefined, forgotPasswordLoadingAction())).toEqual(
      stateAtRequest
    );
  });

  it("should handle forgot password success", () => {
    const stateAfterForgotSuccess = {
      ...initialState,
      forgotPasswordProcessing: false,
      forgotPasswordSuccess: true,
      forgotPasswordFailed: false,
    };
    expect(userReducer(undefined, forgotPasswordSuccessAction())).toEqual(
      stateAfterForgotSuccess
    );
  });

  it("should handle forgot password failed", () => {
    const stateAfterError = {
      ...initialState,
      forgotPasswordProcessing: false,
      forgotPasswordSuccess: false,
      forgotPasswordFailed: true,
    };
    expect(userReducer(undefined, forgotPasswordFailedAction())).toEqual(
      stateAfterError
    );
  });

  it("should handle restore password request", () => {
    const stateAtRequest = {
      ...initialState,
      restorePasswordProcessing: true,
    };
    expect(userReducer(undefined, restorePasswordLoadingAction())).toEqual(
      stateAtRequest
    );
  });

  it("should handle restore password success", () => {
    const stateAfterRestoreSuccess = {
      ...initialState,
      restorePasswordProcessing: false,
      restorePasswordFailed: false,
    };
    expect(userReducer(undefined, restorePasswordSuccessAction())).toEqual(
      stateAfterRestoreSuccess
    );
  });

  it("should handle restore password failed", () => {
    const stateAfterError = {
      ...initialState,
      restorePasswordProcessing: false,
      restorePasswordFailed: true,
    };
    expect(userReducer(undefined, restorePasswordFailedAction())).toEqual(
      stateAfterError
    );
  });
});
