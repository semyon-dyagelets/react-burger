import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, useLocation, RouteProps } from "react-router-dom";

import { checkToken } from "../../services/actions/user";

interface ProtectedRouteProps extends RouteProps {
  children: ReactNode;
  rest?: any;
  authorisationRequired?: boolean;
}

export const ProtectedRoute = ({
  authorisationRequired,
  children,
  ...rest
}: ProtectedRouteProps) => {
  const { userAuthorised } = useSelector((state: any) => state.userState);
  const dispatch = useDispatch();

  const location = useLocation<{ from: Location }>();

  useEffect(() => {
    // @ts-ignore
    dispatch(checkToken());
  }, [dispatch]);

  if (!authorisationRequired && userAuthorised) {
    const { from } = location.state || { from: { pathname: "/" } };
    return (
      <Route {...rest}>
        <Redirect to={from} />
      </Route>
    );
  }

  if (authorisationRequired && !userAuthorised) {
    return (
      <Route {...rest}>
        <Redirect to={{ pathname: "/login", state: { from: location } }} />
      </Route>
    );
  }

  return <Route {...rest}>{children}</Route>;
};
