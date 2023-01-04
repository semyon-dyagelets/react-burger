import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, useHistory, useLocation } from "react-router-dom";

import { checkToken } from "../../services/actions/user";
import PropTypes from "prop-types";

export const ProtectedRoute = ({
  unauthorisedUserOnly = false,
  children,
  ...rest
}) => {
  const { userAuthorised, authorisationChecked } = useSelector(
    (state) => state.userState
  );
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    dispatch(checkToken());
  }, [dispatch]);

  if (!authorisationChecked) {
    return null;
  }

  if (unauthorisedUserOnly && userAuthorised) {
    history.push(location.state?.from || "/");
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

  return <Route {...rest} render={({ location }) => children} />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  rest: PropTypes.any,
  unauthorisedUserOnly: PropTypes.bool,
};
