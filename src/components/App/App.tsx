import React from "react";
import AppStyles from "./App.module.css";

import { AppHeader } from "../AppHeader/AppHeader";
import { BurgerIngridients } from "../BurgerIngredients/BurgerIngridients";
import { BurgerConstructor } from "../BurgerConstructor/BurgerConstructor";

import { BurgerIngridientsData, BurgerConstructorData } from "../../utils/data";

function App() {
  return (
    <div className={AppStyles.app}>
      <div className={AppStyles.page}>
        <AppHeader />
        <main className={AppStyles.main}>
          <BurgerIngridients ingridients={BurgerIngridientsData} />
          <BurgerConstructor elements={BurgerConstructorData} />
        </main>
      </div>
    </div>
  );
}

export default App;
