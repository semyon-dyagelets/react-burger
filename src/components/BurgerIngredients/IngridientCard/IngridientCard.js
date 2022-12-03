import { useState } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Modal } from "../../Modal/Modal";
import { ingridientPropTypes } from "../../../utils/types";

import IngridientCardStyles from "./IngridientCardStyles.module.css";

export const IngridientCard = ({ ingridient }) => {
  const {
    calories,
    carbohydrates,
    fat,
    image_large: imageLarge,
    image,
    name,
    price,
    proteins,
  } = ingridient;

  const [isShowIngridientModal, setIsShowIngridientModal] = useState(false);

  const openIngridientModal = () => {
    setIsShowIngridientModal(true);
  };

  const closeIngridientModal = () => {
    setIsShowIngridientModal(false);
  };

  const onIngridientCardClick = () => {
    openIngridientModal();
  };

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
      {isShowIngridientModal && (
        <Modal
          onClose={closeIngridientModal}
          className={`${IngridientCardStyles.modal__content_ingridient} pt-10 pr-10 pb-15 pl-10`}
          buttonCloseClassName={`${IngridientCardStyles.modal__close_ingridient}`}
        >
          <p
            className={`${IngridientCardStyles.modal__title} text text_type_main-large`}
          >
            Детали ингредиента
          </p>
          <img
            className={IngridientCardStyles.modal__image}
            src={imageLarge}
            alt={name}
          />
          <h3 className="text text_type_main-medium mt-4">{name}</h3>
          <ul className={`${IngridientCardStyles.modal__nutrients} mt-8`}>
            <li
              className={`${IngridientCardStyles.modal__nutrient} text text_type_main-default text_color_inactive`}
            >
              Калории,ккал
              <span className="text_type_digits-default">{calories}</span>
            </li>
            <li
              className={`${IngridientCardStyles.modal__nutrient} text text_type_main-default text_color_inactive`}
            >
              Белки, г
              <span className="text_type_digits-default">{proteins}</span>
            </li>
            <li
              className={`${IngridientCardStyles.modal__nutrient} text text_type_main-default text_color_inactive`}
            >
              Жиры, г<span className="text_type_digits-default">{fat}</span>
            </li>
            <li
              className={`${IngridientCardStyles.modal__nutrient} text text_type_main-default text_color_inactive`}
            >
              Углеводы, г
              <span className="text_type_digits-default">{carbohydrates}</span>
            </li>
          </ul>
        </Modal>
      )}
    </>
  );
};

IngridientCard.propTypes = {
  ingridient: ingridientPropTypes.isRequired,
};
