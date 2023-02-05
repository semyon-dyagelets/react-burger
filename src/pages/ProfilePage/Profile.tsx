import { FC, ReactNode, useCallback, useEffect } from "react";
import { NavLink, Route } from "react-router-dom";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

import { logoutUser } from "../../services/actions/user";
import { useAppDispatch } from "../../services/types";
import {
  WEBSOCKET_CONNECTION_REQUEST,
} from "../../services/constants";
import { WEBSOCKET_URL } from "../../utils/constants";
import { getCookie } from "../../utils/helpers";
import { webSocketConnectionClosedAction } from "../../services/actions/websocket";

import ProfileStyles from "./ProfileStyles.module.css";

interface IProfile {
  children: ReactNode;
}

export const ProfilePage: FC<IProfile> = ({ children }) => {
  const appDispatch = useAppDispatch();

  const handleLogout = useCallback(() => {
    appDispatch(logoutUser());
  }, [appDispatch]);

  useEffect(() => {
    appDispatch({
      type: WEBSOCKET_CONNECTION_REQUEST,
      payload: `${WEBSOCKET_URL}?token=${getCookie("accessToken")}`,
    });
    return () => {
      appDispatch(webSocketConnectionClosedAction());
    };
  }, [appDispatch]);

  return (
    <div className={ProfileStyles.container}>
      <nav className={ProfileStyles.navigation}>
        <ul>
          <li className={ProfileStyles.navigation__link}>
            <NavLink
              exact
              to="/profile"
              className="text text_type_main-medium text_color_inactive"
              activeClassName={ProfileStyles.text_active}
            >
              Профиль
            </NavLink>
          </li>
          <li className={ProfileStyles.navigation__link}>
            <NavLink
              to="/profile/orders"
              className="text text_type_main-medium text_color_inactive"
              activeClassName={ProfileStyles.text_active}
            >
              История заказов
            </NavLink>
          </li>
          <li className={ProfileStyles.navigation__link}>
            <Button
              htmlType="button"
              extraClass={`${ProfileStyles.buttons__exit} text text_type_main-medium text_color_inactive`}
              onClick={handleLogout}
            >
              Выход
            </Button>
          </li>
        </ul>
        <span className="text text_type_main-default text_color_inactive mt-20">
          <Route exact path="/profile">
            В этом разделе вы можете изменить свои персональные данные
          </Route>
          <Route exact path="/profile/orders">
            В этом разделе вы можете просмотреть свою историю заказов
          </Route>
        </span>
      </nav>
      {children}
    </div>
  );
};
