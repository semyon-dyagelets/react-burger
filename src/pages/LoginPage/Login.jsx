import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { authoriseUser } from "../../services/actions/user";

import LoginStyles from "./LoginStyles.module.css";

export const LoginPage = () => {
  const [emailInputValue, setEmailInputValue] = useState("");
  const [passwordInputValue, setPasswordInputValue] = useState("");
  const dispatch = useDispatch();

  const changeEmailInput = (event) => {
    setEmailInputValue(event.target.value);
  };

  const changePasswordInput = (event) => {
    setPasswordInputValue(event.target.value);
  };

  const handleLogin = useCallback(
    (event) => {
      event.preventDefault();
      dispatch(authoriseUser(emailInputValue, passwordInputValue));
      setEmailInputValue("");
      setPasswordInputValue("");
    },
    [dispatch, emailInputValue, passwordInputValue]
  );

  return (
    <div className={LoginStyles.container}>
      <h2 className={`${LoginStyles.title} text text_type_main-medium`}>
        Вход
      </h2>
      <form className={LoginStyles.form} onSubmit={handleLogin}>
        <EmailInput
          value={emailInputValue}
          onChange={changeEmailInput}
          placeholder="E-mail"
          extraClass="mt-6"
        ></EmailInput>
        <PasswordInput
          value={passwordInputValue}
          onChange={changePasswordInput}
          placeholder="Пароль"
          extraClass="mt-6"
        ></PasswordInput>
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="mt-6"
          disabled={!emailInputValue || !passwordInputValue}
        >
          Войти
        </Button>
      </form>
      <div className="mt-20">
        <div className={LoginStyles.help__container}>
          <p className="text text_type_main-default text_color_inactive">
            Вы — новый пользователь?
          </p>
          <Link
            className={`${LoginStyles.link} text text_type_main-default`}
            to="/register"
          >
            Зарегистрироваться
          </Link>
        </div>
        <div className={`${LoginStyles.help__container} mt-4`}>
          <p className="text text_type_main-default text_color_inactive">
            Забыли пароль?
          </p>
          <Link
            className={`${LoginStyles.link} text text_type_main-default`}
            to="/forgot-password"
          >
            Восстановить пароль
          </Link>
        </div>
      </div>
    </div>
  );
};
