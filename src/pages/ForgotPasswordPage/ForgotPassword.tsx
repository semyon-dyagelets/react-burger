import { useCallback, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { requestForNewPassword } from "../../services/actions/user";

import ForgotPasswordStyles from "./ForgotPasswordStyles.module.css";
import { useAppDispatch } from "../../services/types";

export const ForgotPasswordPage = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [emailValue, setEmailValue] = useState("");
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(event.target.value);
  };

  const handleResetClick = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      dispatch(requestForNewPassword(emailValue));
      history.push("/reset-password");
      setEmailValue("");
    },
    [dispatch, emailValue, history]
  );

  return (
    <div className={ForgotPasswordStyles.container}>
      <h2
        className={`${ForgotPasswordStyles.title} text text_type_main-medium`}
      >
        Восстановление пароля
      </h2>
      <form className={ForgotPasswordStyles.form} onSubmit={handleResetClick}>
        <EmailInput
          value={emailValue}
          onChange={onChange}
          placeholder="Укажите e-mail"
          extraClass="mt-6"
        ></EmailInput>
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="mt-6"
          disabled={!emailValue}
        >
          Восстановить
        </Button>
      </form>
      <div className="mt-20">
        <div className={ForgotPasswordStyles.help__container}>
          <p className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?
          </p>
          <Link
            className={`${ForgotPasswordStyles.link} text text_type_main-default`}
            to="/login"
          >
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
};
