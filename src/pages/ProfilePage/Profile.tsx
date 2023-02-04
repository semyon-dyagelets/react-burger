import { useCallback, useEffect, useState } from "react";
import {
  NavLink,
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { logoutUser, updateUser } from "../../services/actions/user";
import { useAppDispatch, useAppSelector } from "../../services/types";
import { OrderList } from "../../components/OrderList/OrderList";

import ProfileStyles from "./ProfileStyles.module.css";
import { useDispatch } from "react-redux";
import { WEBSOCKET_CONNECTION_CLOSED, WEBSOCKET_CONNECTION_REQUEST } from "../../services/constants";
import { WEBSOCKET_URL } from "../../utils/constants";
import { getCookie } from "../../utils/helpers";

export const ProfilePage = () => {
  const appDispatch = useAppDispatch();
  const { userName, userEmail } = useAppSelector((state) => state.userState);
  const dispatch = useDispatch();
  const [emailInputValue, setEmailInputValue] = useState(userEmail);
  const [passwordInputValue, setPasswordInputValue] = useState("");
  const [nameInputValue, setNameInputValue] = useState(userName);
  const emptyFields =
    !nameInputValue || !emailInputValue || !passwordInputValue;

  const changeEmailInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInputValue(event.target.value);
  };

  const changePasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordInputValue(event.target.value);
  };

  const changeNameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameInputValue(event.target.value);
  };

  const handleLogout = useCallback(() => {
    appDispatch(logoutUser());
  }, [appDispatch]);

  const handleClickCancel = () => {
    setEmailInputValue(userEmail);
    setPasswordInputValue("");
    setNameInputValue(userName);
  };

  const handleSaveUpdatedInfo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    appDispatch(updateUser(nameInputValue, emailInputValue, passwordInputValue));
  };

  useEffect(() => {
    dispatch({
      type: WEBSOCKET_CONNECTION_REQUEST,
      payload: `${WEBSOCKET_URL}?token=${getCookie("accessToken")}`
    });
    return () => {
      dispatch({ type: WEBSOCKET_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  return (
    <div className={ProfileStyles.container}>
      <Router>
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
        <Switch>
          <Route exact path="/profile">
            <form onSubmit={handleSaveUpdatedInfo}>
              <Input
                value={nameInputValue}
                onChange={changeNameInput}
                type="text"
                placeholder="Имя"
                icon={"EditIcon"}
              ></Input>
              <EmailInput
                value={emailInputValue}
                onChange={changeEmailInput}
                placeholder="Логин"
                isIcon={true}
                extraClass="mt-6"
              ></EmailInput>
              <PasswordInput
                value={passwordInputValue}
                onChange={changePasswordInput}
                placeholder="Пароль"
                icon="EditIcon"
                extraClass="mt-6"
              ></PasswordInput>
              <div className={`${ProfileStyles.buttons__container} mt-6`}>
                {nameInputValue || emailInputValue || passwordInputValue ? (
                  <Button
                    htmlType="button"
                    extraClass={ProfileStyles.buttons__cancel}
                    onClick={handleClickCancel}
                  >
                    Отмена
                  </Button>
                ) : null}
                <Button htmlType="submit" disabled={emptyFields}>
                  Сохранить
                </Button>
              </div>
            </form>
          </Route>
          <Route exact path="/profile/orders">
            <OrderList />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};
