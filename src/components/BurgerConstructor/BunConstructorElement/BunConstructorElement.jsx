import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropTypes } from "../../../utils/types";

import PropTypes from "prop-types";

import BunConstructorElementStyles from "./BunConstructorElementStyles.module.css";

export const BunConstructorElement = ({
  bunSelected,
  typeOfBun,
  extraText,
}) => {
  const { name, price, image } = bunSelected;
  return (
    <div className={BunConstructorElementStyles.element__container}>
      <ConstructorElement
        type={typeOfBun}
        isLocked={true}
        text={`${name} ${extraText}`}
        price={price}
        thumbnail={image}
      />
    </div>
  );
};

BunConstructorElement.propTypes = {
  bunSelected: ingredientPropTypes.isRequired,
  typeOfBun: PropTypes.string.isRequired,
  extraText: PropTypes.string.isRequired,
};
