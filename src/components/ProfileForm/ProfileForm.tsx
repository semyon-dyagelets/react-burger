import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components"
import { useState } from "react";
import { updateUser } from "../../services/actions/user";
import { useAppDispatch, useAppSelector } from "../../services/types";

import ProfileFormStyles from "./ProfileFormStyles.module.css";

export const ProfileForm = () => { 

    const { userName, userEmail } = useAppSelector((state) => state.userState);
    const [emailInputValue, setEmailInputValue] = useState(userEmail);
    const [passwordInputValue, setPasswordInputValue] = useState("");
    const [nameInputValue, setNameInputValue] = useState(userName);
    const emptyFields =
    !nameInputValue || !emailInputValue || !passwordInputValue;

    const appDispatch = useAppDispatch();

    const changeEmailInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmailInputValue(event.target.value);
      };
    
      const changePasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordInputValue(event.target.value);
      };
    
      const changeNameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNameInputValue(event.target.value);
      };

      const handleSaveUpdatedInfo = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        appDispatch(updateUser(nameInputValue, emailInputValue, passwordInputValue));
      };

      const handleClickCancel = () => {
        setEmailInputValue(userEmail);
        setPasswordInputValue("");
        setNameInputValue(userName);
      };

    return (
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
              <div className={`${ProfileFormStyles.buttons__container} mt-6`}>
                {nameInputValue || emailInputValue || passwordInputValue ? (
                  <Button
                    htmlType="button"
                    extraClass={ProfileFormStyles.buttons__cancel}
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
    )
}

