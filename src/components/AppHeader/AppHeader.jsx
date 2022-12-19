import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeaderStyles from "./AppHeader.module.css";

export const AppHeader = () => {
  return (
    <header className={`${AppHeaderStyles.header} pt-4 pb-4`}>
      <nav className={AppHeaderStyles.navigation}>
        <ul className={AppHeaderStyles.navigation__list}>
          <div className={AppHeaderStyles.navigation__group}>
            <li className={`${AppHeaderStyles.navigation__item} p-5`}>
              <BurgerIcon type="primary" />
              <a className="ml-2 text text_type_main-default" href="/">
                Конструктор
              </a>
            </li>
            <li className={`${AppHeaderStyles.navigation__item} p-5 ml-2`}>
              <ListIcon type="secondary" />
              <a
                className="ml-2 text text_type_main-default text_color_inactive"
                href="/"
              >
                Лента заказов
              </a>
            </li>
          </div>
          <li className={AppHeaderStyles.logo__container}>
            <Logo />
          </li>
          <li className={`${AppHeaderStyles.navigation__item} p-5`}>
            <ProfileIcon type="secondary" />
            <a
              className="ml-2 text text_type_main-default text_color_inactive"
              href="/"
            >
              Личный кабинет
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
