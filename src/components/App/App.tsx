import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { Location } from "history";

import { AppHeader } from "../AppHeader/AppHeader";
import { fetchIngredients } from "../../services/actions/ingredients";
import { ForgotPasswordPage } from "../../pages/ForgotPasswordPage/ForgotPassword";
import { IngredientDetails } from "../BurgerIngredients/IngredientDetails/IngredientDetails";
import { IngredientPage } from "../../pages/IngredientPage/IngredientPage";
import { LentaPage } from "../../pages/LentaPage/Lenta";
import { LoginPage } from "../../pages/LoginPage/Login";
import { MainPage } from "../../pages/MainPage/MainPage";
import { Modal } from "../Modal/Modal";
import { NotFound404Page } from "../../pages/NotFound404Page/NotFound404";
import { ProfilePage } from "../../pages/ProfilePage/Profile";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";
import { RegisterPage } from "../../pages/RegisterPage/Register";
import { ResetPasswordPage } from "../../pages/ResetPasswordPage/ResetPassword";

import AppStyles from "./App.module.css";

const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let location = useLocation<{ background: Location }>();
  const background = location.state && location.state?.background;

  useEffect(() => {
    //@ts-ignore
    dispatch(fetchIngredients());
  }, [dispatch]);

  const handleCloseModal = () => {
    history.goBack();
  };

  return (
    <div className={AppStyles.app}>
      <div className={AppStyles.page}>
        <AppHeader />
        <main className={AppStyles.main}>
          <Switch location={background || location}>
            <Route exact path="/">
              <MainPage />
            </Route>

            <ProtectedRoute exact path="/login">
              <LoginPage />
            </ProtectedRoute>

            <ProtectedRoute exact path="/register">
              <RegisterPage />
            </ProtectedRoute>

            <ProtectedRoute exact path="/forgot-password">
              <ForgotPasswordPage />
            </ProtectedRoute>

            <ProtectedRoute exact path="/reset-password">
              <ResetPasswordPage />
            </ProtectedRoute>

            <ProtectedRoute exact path="/profile" authorisationRequired>
              <ProfilePage />
            </ProtectedRoute>

            <Route exact path="/feed">
              <LentaPage />
            </Route>

            <Route exact path="/ingredients/:ingredientId">
              <IngredientPage />
            </Route>

            <Route>
              <NotFound404Page />
            </Route>
          </Switch>
          {background && (
            <Route exact path="/ingredients/:ingredientId">
              <Modal
                onClose={handleCloseModal}
                className={`${AppStyles.modal__content_ingredient} pt-10 pr-10 pb-15 pl-10`}
                buttonCloseClassName={`${AppStyles.modal__close_ingridient}`}
              >
                <IngredientDetails />
              </Modal>
            </Route>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
