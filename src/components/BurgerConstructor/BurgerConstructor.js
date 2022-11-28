import PropTypes from "prop-types";

import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorStyles from "./BurgerConstructorStyles.module.css";

export const BurgerConstructor = ({ elements }) => {
  return (
    <>
      <section
        className={`${BurgerConstructorStyles.constructor} pt-25 pr-4 pl-4`}
      >
        <div
          className={`${BurgerConstructorStyles.elements} custom-scroll`}
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          {elements.map((element) => (
            <div className={BurgerConstructorStyles.element__container}>
              <DragIcon type="primary" />
              <ConstructorElement
                //   type="top"
                isLocked={true}
                text={element.name}
                price={element.price}
                thumbnail={element.image}
              />
            </div>
          ))}
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

const elementPropTypes = PropTypes.shape({
  _id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.oneOf(["bun", "main", "sauce"]),
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  price: PropTypes.number,
  image: PropTypes.string,
  image_mobile: PropTypes.string,
  image_large: PropTypes.string,
  __v: PropTypes.number,
});

BurgerConstructor.propTypes = {
  elements: PropTypes.arrayOf(elementPropTypes).isRequired,
};
