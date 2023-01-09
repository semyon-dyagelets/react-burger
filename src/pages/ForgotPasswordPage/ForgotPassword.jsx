import { useCallback, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { requestForNewPassword } from "../../services/actions/user";

import ForgotPasswordStyles from "./ForgotPasswordStyles.module.css";

export const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [emailValue, setEmailValue] = useState("");
  const onChange = (e) => {
    setEmailValue(e.target.value);
  };

  const handleResetClick = useCallback(
    (event) => {
      event.preventDefault();
      dispatch(requestForNewPassword(emailValue, history));
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
      <form className={ForgotPasswordStyles.form}>
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
          onClick={handleResetClick}
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
