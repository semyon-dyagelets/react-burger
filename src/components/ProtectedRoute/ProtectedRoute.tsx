import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, useLocation, RouteProps } from "react-router-dom";

import { checkToken } from "../../services/actions/user";

interface ProtectedRouteProps extends RouteProps {
  children: ReactNode;
  rest?: any;
  unauthorisedUserOnly?: boolean;
};

export const ProtectedRoute = ({
  unauthorisedUserOnly = false,
  children,
  ...rest
}: ProtectedRouteProps) => {
  const { userAuthorised, authorisationChecked } = useSelector(
    (state: any) => state.userState
  );
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    // @ts-ignore
    dispatch(checkToken());
  }, [dispatch]);

  if (!authorisationChecked) {
    return null;
  }

  if (unauthorisedUserOnly && userAuthorised) {
    return (
      <Redirect
        to={{
          pathname: "/",
          state: { from: location },
        }}
      />
    );
  }

  if (!unauthorisedUserOnly && !userAuthorised) {
    return (
      <Redirect
        to={{
          pathname: "/login",
          state: { from: location },
        }}
      />
    );
  }

  return <Route {...rest}>{children}</Route>;
};
