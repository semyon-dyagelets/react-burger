import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { registerUser } from "../../services/actions/user";

import RegisterStyles from "./RegisterStyles.module.css";
import { useAppDispatch } from "../../services/types";

export const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const [emailInputValue, setEmailInputValue] = useState("");
  const [passwordInputValue, setPasswordInputValue] = useState("");
  const [nameInputValue, setNameInputValue] = useState("");

  const changeEmailInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInputValue(event.target.value);
  };

  const changePasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordInputValue(event.target.value);
  };

  const changeNameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameInputValue(event.target.value);
  };

  const handleRegisterClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(
      registerUser(emailInputValue, passwordInputValue, nameInputValue)
    );
    history.push("/login");
  };

  return (
    <div className={RegisterStyles.container}>
      <h2 className={`${RegisterStyles.title} text text_type_main-medium`}>
        Регистрация
      </h2>
      <form className={RegisterStyles.form} onSubmit={handleRegisterClick}>
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
