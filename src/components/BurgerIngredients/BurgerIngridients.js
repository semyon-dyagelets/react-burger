import { useState } from "react";
import PropTypes from "prop-types";

import { IngridientCard } from "./IngridientCard/IngridientCard";
import { Tabs } from "../BurgerIngredients/Tabs/Tabs";
import { Modal } from "../Modal/Modal";
import { IngredientDetails } from "./IngredientDetails/IngredientDetails";
import { ingridientPropTypes } from "../../utils/types";

import BurgerIngridientsStyles from "./BurgerIngridients.module.css";

export const BurgerIngridients = ({ ingridients }) => {
  const [isShowIngridientModal, setIsShowIngridientModal] = useState(false);
  const [selectedIngridient, setSelectedIngridient] = useState(null);

  const openIngridientModal = () => {
    setIsShowIngridientModal(true);
  };

  const closeIngridientModal = () => {
    setIsShowIngridientModal(false);
    setSelectedIngridient(null);
  };

  const handleIngridientClick = (ingridient) => {
    setSelectedIngridient(ingridient);
    openIngridientModal();
  };

  const buns = ingridients.filter((ingridient) => ingridient.type === "bun");
  const sauces = ingridients.filter(
    (ingridient) => ingridient.type === "sauce"
  );
  const mains = ingridients.filter((ingridient) => ingridient.type === "main");

  return (
    <>
      <section className={BurgerIngridientsStyles.ingridients}>
        <h1 className="text text_type_main-large mt-10">Соберите бургер</h1>
        <div className="mt-5">
          <Tabs />
        </div>
        <div
          className={`${BurgerIngridientsStyles.ingridients__container} mt-10 custom-scroll`}
        >
          <h2 className="text text_type_main-medium">Булки</h2>
          <ul
            className={`${BurgerIngridientsStyles.categories} pt-6 pb-10 pl-4`}
          >
            {buns.map((item) => (
              <IngridientCard
                key={item._id}
                ingridient={item}
                onIngridientCardClick={() => handleIngridientClick(item)}
              />
            ))}
          </ul>
          <h2 className="text text_type_main-medium">Соусы</h2>
          <ul
            className={`${BurgerIngridientsStyles.categories} pt-6 pb-10 pl-4`}
          >
            {sauces.map((item) => (
              <IngridientCard
                key={item._id}
                ingridient={item}
                onIngridientCardClick={() => handleIngridientClick(item)}
              />
            ))}
          </ul>
          <h2 className="text text_type_main-medium">Начинки</h2>
          <ul
            className={`${BurgerIngridientsStyles.categories} pt-6 pb-10 pl-4`}
          >
            {mains.map((item) => (
              <IngridientCard
                key={item._id}
                ingridient={item}
                onIngridientCardClick={() => handleIngridientClick(item)}
              />
            ))}
          </ul>
        </div>
      </section>
      {isShowIngridientModal && (
        <Modal
          onClose={closeIngridientModal}
          className={`${BurgerIngridientsStyles.modal__content_ingridient} pt-10 pr-10 pb-15 pl-10`}
          buttonCloseClassName={`${BurgerIngridientsStyles.modal__close_ingridient}`}
        >
          <IngredientDetails ingridient={selectedIngridient} />
        </Modal>
      )}
    </>
  );
};

BurgerIngridients.propTypes = {
  ingridients: PropTypes.arrayOf(ingridientPropTypes).isRequired,
};
