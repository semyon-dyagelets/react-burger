import PropTypes from "prop-types";

import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorStyles from "./BurgerConstructorStyles.module.css";
import { ingridientPropTypes } from "../../utils/types";

export const BurgerConstructor = ({ elements }) => {
  const buns = elements.filter((ingridient) => ingridient.type === "bun");
  const upperBun = buns[0];
  const bottomBun = buns[1];
  const mainIngridients = elements.filter(
    (ingridient) => ingridient.type !== "bun"
  );
  return (
    <>
      <section
        className={`${BurgerConstructorStyles.constructor} pt-25 pr-4 pl-4`}
      >
        <div className={BurgerConstructorStyles.elements}>
          {upperBun && (
            <div className={BurgerConstructorStyles.element__container}>
              <ConstructorElement
                type="top"
                isLocked={true}
                text={`${upperBun.name} (верх)`}
                price={upperBun.price}
                thumbnail={upperBun.image}
              />
            </div>
          )}
          <ul
            className={`${BurgerConstructorStyles.elements__mainingridients} custom-scroll`}
          >
            {mainIngridients.map((element) => (
              <li
                className={BurgerConstructorStyles.element__container}
                key={element._id}
              >
                <DragIcon type="primary" />
                <ConstructorElement
                  type="undefined"
                  isLocked={false}
                  text={element.name}
                  price={element.price}
                  thumbnail={element.image}
                />
              </li>
            ))}
          </ul>
          {bottomBun && (
            <div
              className={`${BurgerConstructorStyles.element__container} pl-8`}
            >
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${bottomBun.name} (низ)`}
                price={bottomBun.price}
                thumbnail={bottomBun.image}
              />
            </div>
          )}
        </div>
        <div className={`${BurgerConstructorStyles.purchase__container} mt-10`}>
          <div className={`${BurgerConstructorStyles.price__container}, mr-10`}>
            <span className="text text_type_digits-medium">610</span>
            <CurrencyIcon type="primary" />
          </div>
          <Button htmlType="button" type="primary" size="large">
            Оформить заказ
          </Button>
        </div>
      </section>
    </>
  );
};

BurgerConstructor.propTypes = {
  elements: PropTypes.arrayOf(ingridientPropTypes).isRequired,
};
