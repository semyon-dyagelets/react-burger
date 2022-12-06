import { useEffect, useState } from "react";

import { AppHeader } from "../AppHeader/AppHeader";
import { BurgerIngridients } from "../BurgerIngredients/BurgerIngridients";
import { BurgerConstructor } from "../BurgerConstructor/BurgerConstructor";
import { BASE_URL } from "../../utils/constants";

import AppStyles from "./App.module.css";

function App() {
  const [infridientsData, setInfridientsData] = useState([]);
  const [isErrorFetching, setIsErrorFetching] = useState(false);

  useEffect(() => {
    fetch(BASE_URL)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      })
      .then((result) => {
        if (result.data) {
          return setInfridientsData(result.data);
        }
        return Promise.reject(result);
      })
      .catch((error) => {
        setIsErrorFetching(true);
        console.log(error.message);
      });
  }, []);

  return (
    <div className={AppStyles.app}>
      <div className={AppStyles.page}>
        <AppHeader />
        <main className={AppStyles.main}>
          {isErrorFetching ? (
            <p className="text text_type_main-default">
              Ошибка при загрузке ингредиентов. Попробуйте зайти позднее
            </p>
          ) : (
            <>
              <BurgerIngridients ingridients={infridientsData} />
              <BurgerConstructor elements={infridientsData} />
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
