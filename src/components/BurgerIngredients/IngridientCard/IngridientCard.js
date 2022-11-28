import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import IngridientCardStyles from "./IngridientCardStyles.module.css";

export const IngridientCard = ({ ingridient }) => {
  const { image, price, name } = ingridient;
  return (
    <li className={IngridientCardStyles.card}>
      <img src={image} alt="ингридиент"></img>
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
  );
};
