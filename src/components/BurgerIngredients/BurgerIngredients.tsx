import React, { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useInView } from "react-intersection-observer";

import { IngredientCard } from "./IngredientCard/IngredientCard";
import { Tabs } from "./Tabs/Tabs";
import { useAppSelector } from "../../services/types";
import { IngredientType, TIngredientInApp } from "../../services/types/data";

import BurgerIngredientsStyles from "./BurgerIngredients.module.css";

export const BurgerIngredients = () => {
  const location = useLocation();

  const bunsTitleRef = useRef<HTMLHeadingElement>(null);
  const saucesTitleRef = useRef<HTMLHeadingElement>(null);
  const fillingsTitleRef = useRef<HTMLHeadingElement>(null);

  const { ref: bunsRef, inView: bunsVisible } = useInView({ threshold: 0.8 });
  const { ref: saucesRef, inView: saucesVisible } = useInView({
    threshold: 0.8,
  });
  const { ref: fillingsRef, inView: fillingsVisible } = useInView({
    threshold: 0.4,
  });

  const { ingredients } = useAppSelector((state) => state.ingredientsState);

  const scrollIntoView = (ref: React.RefObject<HTMLElement>) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const buns: TIngredientInApp[] = ingredients.filter(
    (ingredient) => ingredient.type === IngredientType.BUN
  );
  const sauces: TIngredientInApp[] = ingredients.filter(
    (ingredient) => ingredient.type === IngredientType.SAUCE
  );
  const mains: TIngredientInApp[] = ingredients.filter(
    (ingredient) => ingredient.type === IngredientType.MAIN
  );

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
                <Link
                  to={{
                    pathname: `/ingredients/${item._id}`,
                    state: { background: location },
                  }}
                >
                  <IngredientCard ingredient={item} />
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
                <Link
                  to={{
                    pathname: `/ingredients/${item._id}`,
                    state: { background: location },
                  }}
                >
                  <IngredientCard ingredient={item} />
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
                <Link
                  to={{
                    pathname: `/ingredients/${item._id}`,
                    state: { background: location },
                  }}
                >
                  <IngredientCard ingredient={item} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};
