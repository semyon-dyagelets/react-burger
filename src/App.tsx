import React from "react";
import "./App.css";

import { AppHeader } from "./components/AppHeader/AppHeader";
import { BurgerIngridients } from "./components/BurgerIngredients/BurgerIngridients";
import { BurgerConstructor } from "./components/BurgerConstructor/BurgerConstructor";

import { BurgerIngridientsData, BurgerConstructorData } from "./utils/data";

function App() {
  return (
    <div className="App">
      <div className="page">
        <AppHeader />
        <main className="main">
          <BurgerIngridients ingridients={BurgerIngridientsData} />
          <BurgerConstructor elements={BurgerConstructorData} />
        </main>
      </div>
    </div>
  );
}

export default App;
