import { useCallback, useState } from "react";
import {
  NavLink,
  BrowserRouter as Router,
  useHistory,
  Switch,
  Route,
} from "react-router-dom";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useDispatch, useSelector } from "react-redux";
import { logoutUser, updateUser } from "../../services/actions/user";
import { OrdersPage } from "../OrdersPage/Orders";

import ProfileStyles from "./ProfileStyles.module.css";

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { userName, userEmail } = useSelector((state) => state.userState);

  const [emailInputValue, setEmailInputValue] = useState(userEmail);
  const [passwordInputValue, setPasswordInputValue] = useState("");
  const [nameInputValue, setNameInputValue] = useState(userName);
  const emptyFields =
    !nameInputValue || !emailInputValue || !passwordInputValue;

  const changeEmailInput = (event) => {
    setEmailInputValue(event.target.value);
  };

  const changePasswordInput = (event) => {
    setPasswordInputValue(event.target.value);
  };

  const changeNameInput = (event) => {
    setNameInputValue(event.target.value);
  };

  const handleLogout = useCallback(
    (event) => {
      event.preventDefault();
      dispatch(logoutUser());
      history.push("/login");
    },
    [dispatch, history]
  );

  const handleClickCancel = (event) => {
    event.preventDefault();
    setEmailInputValue(userEmail);
    setPasswordInputValue("");
    setNameInputValue(userName);
  };

  const handleSaveUpdatedInfo = (event) => {
    event.preventDefault();
    dispatch(updateUser(nameInputValue, emailInputValue, passwordInputValue));
  };

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
            В этом разделе вы можете изменить свои персональные данные
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
          <Route exact path="profile/orders">
            <OrdersPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};
