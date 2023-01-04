import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";
import AppHeaderStyles from "./AppHeader.module.css";

export const AppHeader = () => {
  return (
    <header className={`${AppHeaderStyles.header} pt-4 pb-4`}>
      <nav className={AppHeaderStyles.navigation}>
        <ul className={AppHeaderStyles.navigation__list}>
          <div className={AppHeaderStyles.navigation__group}>
            <li className="p-5">
              <NavLink
                exact
                className={`${AppHeaderStyles.navigation__link} ml-2 text_type_main-default text text_color_inactive`}
                activeClassName={AppHeaderStyles.text_active}
                to="/"
              >
                <BurgerIcon type="secondary" />
                Конструктор
              </NavLink>
            </li>
            <li className="p-5 ml-2">
              <NavLink
                exact
                className={`${AppHeaderStyles.navigation__link} ml-2 text_type_main-default text text_color_inactive`}
                activeClassName={AppHeaderStyles.text_active}
                to="/feed"
              >
                <ListIcon type="secondary" />
                Лента заказов
              </NavLink>
            </li>
          </div>
          <li className={AppHeaderStyles.logo__container}>
            <Logo />
          </li>
          <li className="p-5">
            <NavLink
              exact
              className={`${AppHeaderStyles.navigation__link} ml-2 text_type_main-default text text_color_inactive`}
              activeClassName={AppHeaderStyles.text_active}
              to="/profile"
            >
              <ProfileIcon type="secondary" />
              Личный кабинет
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
