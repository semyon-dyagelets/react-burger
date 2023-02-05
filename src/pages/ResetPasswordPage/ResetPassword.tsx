import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { restoreWithNewPassword } from "../../services/actions/user";
import { useAppDispatch, useAppSelector } from "../../services/types";
import ResetPasswordStyles from "./ResetPasswordStyles.module.css";

export const ResetPasswordPage = () => {
  const [passwordValue, setPasswordValue] = useState("");
  const [codeValue, setCodeValue] = useState("");
  const { forgotPasswordSuccess } = useAppSelector((state) => state.userState);
  const dispatch = useAppDispatch();
  const history = useHistory();

  const onCodeInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCodeValue(event.target.value);
  };

  const onPasswordInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordValue(event.target.value);
  };
  
  const handleSaveClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(restoreWithNewPassword(passwordValue, codeValue));
    history.push("/login");
    setPasswordValue("");
    setCodeValue("");
  };

  useEffect(() => {
    if (!forgotPasswordSuccess) {
      history.push("/");
    }
  });

  return (
    <div className={ResetPasswordStyles.container}>
      <h2 className={`${ResetPasswordStyles.title} text text_type_main-medium`}>
        Восстановление пароля
      </h2>
      <form className={ResetPasswordStyles.form} onSubmit={handleSaveClick}>
        <PasswordInput
          onChange={onPasswordInputChange}
          value={passwordValue}
          placeholder="Введите новый пароль"
          extraClass="mt-6"
        ></PasswordInput>
        <Input
          value={codeValue}
          onChange={onCodeInputChange}
          placeholder="Введите код из письма"
          extraClass="mt-6"
        ></Input>
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="mt-6"
          disabled={!passwordValue || !codeValue}
        >
          Сохранить
        </Button>
      </form>
      <div className="mt-20">
        <div className={ResetPasswordStyles.help__container}>
          <p className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?
          </p>
          <Link
            className={`${ResetPasswordStyles.link} text text_type_main-default`}
            to="/login"
          >
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
};
