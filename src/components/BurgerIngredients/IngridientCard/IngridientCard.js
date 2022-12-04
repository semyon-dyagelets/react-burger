import { useState } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Modal } from "../../Modal/Modal";
import { IngredientDetails } from "../IngredientDetails/IngredientDetails";
import { ingridientPropTypes } from "../../../utils/types";

import IngridientCardStyles from "./IngridientCardStyles.module.css";

export const IngridientCard = ({ ingridient }) => {
  const { image, name, price } = ingridient;

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
          <IngredientDetails ingridient={ingridient} />
        </Modal>
      )}
    </>
  );
};

IngridientCard.propTypes = {
  ingridient: ingridientPropTypes.isRequired,
};
