import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

import { IngredientCard } from "./IngredientCard/IngredientCard";
import { Tabs } from "./Tabs/Tabs";
import { Modal } from "../Modal/Modal";
import { IngredientDetails } from "./IngredientDetails/IngredientDetails";

import { useDispatch, useSelector } from "react-redux";
import { fetchIngredients } from "../../services/actions/ingredients";
import { OPEN_INGREDIENT_DETAILS } from "../../services/actions/details";

import BurgerIngredientsStyles from "./BurgerIngredients.module.css";
import { Link } from "react-router-dom";

export const BurgerIngredients = () => {
  const dispatch = useDispatch();

  const bunsTitleRef = useRef();
  const saucesTitleRef = useRef();
  const fillingsTitleRef = useRef();

  const { ref: bunsRef, inView: bunsVisible } = useInView({ threshold: 0.8 });
  const { ref: saucesRef, inView: saucesVisible } = useInView({
    threshold: 0.8,
  });
  const { ref: fillingsRef, inView: fillingsVisible } = useInView({
    threshold: 0.4,
  });

  const { ingredients } = useSelector((state) => state.ingredientsState);

  const [isShowIngridientModal, setIsShowIngridientModal] = useState(false);

  const openIngridientModal = () => {
    setIsShowIngridientModal(true);
  };

  const closeIngridientModal = () => {
    setIsShowIngridientModal(false);
  };

  const handleIngridientClick = (ingredient) => {
    dispatch({ type: OPEN_INGREDIENT_DETAILS, payload: ingredient });
    openIngridientModal();
  };

  const scrollIntoView = (ref) => {
    ref.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  const buns = ingredients.filter((ingredient) => ingredient.type === "bun");
  const sauces = ingredients.filter(
    (ingredient) => ingredient.type === "sauce"
  );
  const mains = ingredients.filter((ingredient) => ingredient.type === "main");

  return (
    <>
      <section className={BurgerIngredientsStyles.ingredients}>
        <h1 className="text text_type_main-large mt-10">Соберите бургер</h1>
        <div className="mt-5">
          <Tabs
            bunsShown={bunsVisible}
            saucesShown={saucesVisible}
            fillingsShown={fillingsVisible}
            onBunsClick={() => scrollIntoView(bunsTitleRef)}
            onFillingsClick={() => scrollIntoView(fillingsTitleRef)}
            onSaucesClick={() => scrollIntoView(saucesTitleRef)}
          />
        </div>
        <div
          className={`${BurgerIngredientsStyles.ingredients__container} mt-10 custom-scroll`}
        >
          <h2 className="text text_type_main-medium" ref={bunsTitleRef}>
            Булки
          </h2>
          <ul
            className={`${BurgerIngredientsStyles.categories} pt-6 pb-10 pl-4`}
            ref={bunsRef}
          >
            {buns.map((item) => (
              <li key={item._id}>
                <Link to={{ pathname: `/ingredients/${item._id}` }}>
                  <IngredientCard
                    ingredient={item}
                    onIngridientCardClick={() => handleIngridientClick(item)}
                  />
                </Link>
              </li>
            ))}
          </ul>
          <h2 className="text text_type_main-medium" ref={saucesTitleRef}>
            Соусы
          </h2>
          <ul
            className={`${BurgerIngredientsStyles.categories} pt-6 pb-10 pl-4`}
            ref={saucesRef}
          >
            {sauces.map((item) => (
              <li key={item._id}>
                <Link to={{ pathname: `/ingredients/${item._id}` }}>
                  <IngredientCard
                    ingredient={item}
                    onIngridientCardClick={() => handleIngridientClick(item)}
                  />
                </Link>
              </li>
            ))}
          </ul>
          <h2 className="text text_type_main-medium">Начинки</h2>
          <ul
            ref={fillingsRef}
            className={`${BurgerIngredientsStyles.categories} pt-6 pb-10 pl-4`}
          >
            {mains.map((item) => (
              <li key={item._id}>
                <Link to={{ pathname: `/ingredients/${item._id}` }}>
                  <IngredientCard
                    ingredient={item}
                    onIngridientCardClick={() => handleIngridientClick(item)}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      {isShowIngridientModal && (
        <Modal
          onClose={closeIngridientModal}
          className={`${BurgerIngredientsStyles.modal__content_ingredient} pt-10 pr-10 pb-15 pl-10`}
          buttonCloseClassName={`${BurgerIngredientsStyles.modal__close_ingridient}`}
        >
          <IngredientDetails />
        </Modal>
      )}
    </>
  );
};
