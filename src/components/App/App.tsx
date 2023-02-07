import { useEffect } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { Location } from "history";

import { useAppDispatch } from "../../services/types";
import { AppHeader } from "../AppHeader/AppHeader";
import { fetchIngredients } from "../../services/actions/ingredients";
import { ForgotPasswordPage } from "../../pages/ForgotPasswordPage/ForgotPassword";
import { IngredientDetails } from "../BurgerIngredients/IngredientDetails/IngredientDetails";
import { IngredientPage } from "../../pages/IngredientPage/IngredientPage";
import { FeedPage } from "../../pages/FeedPage/Feed";
import { LoginPage } from "../../pages/LoginPage/Login";
import { MainPage } from "../../pages/MainPage/Main";
import { Modal } from "../Modal/Modal";
import { NotFound404Page } from "../../pages/NotFound404Page/NotFound404";
import { ProfilePage } from "../../pages/ProfilePage/Profile";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";
import { RegisterPage } from "../../pages/RegisterPage/Register";
import { ResetPasswordPage } from "../../pages/ResetPasswordPage/ResetPassword";
import { OrderPage } from "../../pages/OrderPage/Order";

import AppStyles from "./App.module.css";
import { OrderContent } from "../OrderContent/OrderContent";
import { ProfileForm } from "../ProfileForm/ProfileForm";
import { OrderList } from "../OrderList/OrderList";

const App = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  let location = useLocation<{ background: Location }>();
  const background = location.state && location.state?.background;

  useEffect(() => {
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
              <ProfilePage>
                <ProfileForm />
              </ProfilePage>
            </ProtectedRoute>

            <ProtectedRoute exact path="/profile/orders" authorisationRequired>
              <ProfilePage>
                <OrderList />
                </ProfilePage>
            </ProtectedRoute>

            <Route exact path="/feed">
              <FeedPage />
            </Route>

            <Route exact path="/feed/:orderId">
              <OrderPage />
            </Route>

            <Route exact path="/ingredients/:ingredientId">
              <IngredientPage />
            </Route>

            <ProtectedRoute
              exact
              path="/profile/orders/:orderId"
              authorisationRequired
            >
              <OrderPage />
            </ProtectedRoute>

            <Route>
              <NotFound404Page />
            </Route>
          </Switch>

          {background && (
            <Route exact path="/feed/:orderId">
              <Modal
                onClose={handleCloseModal}
                className={AppStyles.modal__content_order}
                buttonCloseClassName={`${AppStyles.modal__close_order}`}
              >
                <OrderContent />
              </Modal>
            </Route>
          )}

          {background && (
            <Route exact path="/ingredients/:ingredientId">
              <Modal
                onClose={handleCloseModal}
                className={`${AppStyles.modal__content_ingredient} pt-10 pr-10 pb-15 pl-10`}
                buttonCloseClassName={`${AppStyles.modal__close_ingredient}`}
              >
                <IngredientDetails />
              </Modal>
            </Route>
          )}

          {background && (
            <Route exact path="/profile/orders/:orderId">
              <Modal
                onClose={handleCloseModal}
                className={AppStyles.modal__content_order}
                buttonCloseClassName={`${AppStyles.modal__close_order}`}
              >
                <OrderContent />
              </Modal>
            </Route>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
