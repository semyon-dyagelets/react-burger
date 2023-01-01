import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { registerUser } from "../../services/actions/user";
import { accessTokenFromCookie } from "../../utils/helpers";

import RegisterStyles from "./RegisterStyles.module.css";

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { userAuthorised } = useSelector((state) => state.userState);
  if (userAuthorised || accessTokenFromCookie) {
    history.push("/");
  }

  const [emailInputValue, setEmailInputValue] = useState("");
  const [passwordInputValue, setPasswordInputValue] = useState("");
  const [nameInputValue, setNameInputValue] = useState("");

  const changeEmailInput = (event) => {
    setEmailInputValue(event.target.value);
  };

  const changePasswordInput = (event) => {
    setPasswordInputValue(event.target.value);
  };

  const changeNameInput = (event) => {
    setNameInputValue(event.target.value);
  };

  const handleRegisterClick = (event) => {
    event.preventDefault();
    dispatch(registerUser(emailInputValue, passwordInputValue, nameInputValue));
  };

  return (
    <div className={RegisterStyles.container}>
      <h2 className={`${RegisterStyles.title} text text_type_main-medium`}>
        Регистрация
      </h2>
      <form className={RegisterStyles.form}>
        <Input
          type="text"
          value={nameInputValue}
          onChange={changeNameInput}
          placeholder="Имя"
          extraClass="mt-6"
        ></Input>
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
          disabled={!nameInputValue || !emailInputValue || !passwordInputValue}
          onClick={handleRegisterClick}
        >
          Зарегистрироваться
        </Button>
      </form>
      <div className="mt-20">
        <div className={RegisterStyles.help__container}>
          <p className="text text_type_main-default text_color_inactive">
            Уже зарегистрированы?
          </p>
          <Link
            className={`${RegisterStyles.link} text text_type_main-default`}
            to="/login"
          >
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
};
