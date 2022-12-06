import PropTypes from "prop-types";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ingridientPropTypes } from "../../../utils/types";

import IngridientCardStyles from "./IngridientCardStyles.module.css";

export const IngridientCard = ({ ingridient, onIngridientCardClick }) => {
  const { image, name, price } = ingridient;

  return (
    <>
      <li className={IngridientCardStyles.card} onClick={onIngridientCardClick}>
        <img src={image} alt={name} />
        <div className={`${IngridientCardStyles.card__price} mt-1`}>
          <span className="text text_type_digits-default mr-1">{price}</span>
          <CurrencyIcon type="primary" />
        </div>
        <p
          className={`${IngridientCardStyles.card__description} text text_type_main-default mt-1`}
        >
          {name}
        </p>
      </li>
    </>
  );
};

IngridientCard.propTypes = {
  ingridient: ingridientPropTypes.isRequired,
  onIngridientCardClick: PropTypes.func.isRequired,
};
