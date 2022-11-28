import PropTypes from "prop-types";
import BurgerIngridientsStyles from "./BurgerIngridients.module.css";
import { IngridientCard } from "./IngridientCard/IngridientCard";

import { Tabs } from "../BurgerIngredients/Tabs/Tabs";

export const BurgerIngridients = ({ ingridients }) => {
  const buns = ingridients.filter((ingridient) => ingridient.type === "bun");
  const sauces = ingridients.filter(
    (ingridient) => ingridient.type === "sauce"
  );
  const mains = ingridients.filter((ingridient) => ingridient.type === "main");

  return (
    <section className={BurgerIngridientsStyles.ingridients}>
      <h1 className="text text_type_main-large mt-10">Соберите бургер</h1>
      <div className="mt-5">
        <Tabs />
      </div>
      <div
        className={`${BurgerIngridientsStyles.ingridients__container} mt-10 custom-scroll`}
      >
        <h2 className="text text_type_main-medium">Булки</h2>
        <ul className={`${BurgerIngridientsStyles.categories} pt-6 pb-10 pl-4`}>
          {buns.map((item) => (
            <IngridientCard key={item._id} ingridient={item} />
          ))}
        </ul>
        <h2 className="text text_type_main-medium">Соусы</h2>
        <ul className={`${BurgerIngridientsStyles.categories} pt-6 pb-10 pl-4`}>
          {sauces.map((item) => (
            <IngridientCard key={item._id} ingridient={item} />
          ))}
        </ul>
        <h2 className="text text_type_main-medium">Начинки</h2>
        <ul className={`${BurgerIngridientsStyles.categories} pt-6 pb-10 pl-4`}>
          {mains.map((item) => (
            <IngridientCard key={item._id} ingridient={item} />
          ))}
        </ul>
      </div>
    </section>
  );
};

const ingridientPropTypes = PropTypes.shape({
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

BurgerIngridients.propTypes = {
  ingridients: PropTypes.arrayOf(ingridientPropTypes).isRequired,
};
