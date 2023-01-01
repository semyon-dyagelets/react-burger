import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";

export function ProtectedRoute({ children, ...rest }) {
  const { userAuthorised } = useSelector((state) => state.userState);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        userAuthorised ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  rest: PropTypes.any,
};
