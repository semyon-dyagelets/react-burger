import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";

import { Location } from "history";

import { AppHeader } from "../AppHeader/AppHeader";
import { LoginPage } from "../../pages/LoginPage/Login";
import { RegisterPage } from "../../pages/RegisterPage/Register";
import { ForgotPasswordPage } from "../../pages/ForgotPasswordPage/ForgotPassword";
import { ResetPasswordPage } from "../../pages/ResetPasswordPage/ResetPassword";
import { NotFound404Page } from "../../pages/NotFound404Page/NotFound404";
import { MainPage } from "../../pages/MainPage/MainPage";
import { ProfilePage } from "../../pages/ProfilePage/Profile";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";
import { LentaPage } from "../../pages/LentaPage/Lenta";

import { fetchIngredients } from "../../services/actions/ingredients";
import { Modal } from "../Modal/Modal";
import { IngredientDetails } from "../BurgerIngredients/IngredientDetails/IngredientDetails";

import AppStyles from "./App.module.css";

const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation<{ background: Location }>();
  const background = location.state && location.state.background;

  useEffect(() => {
    //@ts-ignore
    dispatch(fetchIngredients());
  }, [dispatch]);

  const handleCloseModal = () => {
    console.log("tried to close;");
    history.goBack();
  };

  return (
    <div className={AppStyles.app}>
      <div className={AppStyles.page}>
        <Router>
          <AppHeader />
          <main className={AppStyles.main}>
            <Switch location={background || location}>
              <Route exact path="/">
                <MainPage />
              </Route>

              <ProtectedRoute exact path="/login" unauthorisedUserOnly>
                <LoginPage />
              </ProtectedRoute>

              <ProtectedRoute exact path="/register" unauthorisedUserOnly>
                <RegisterPage />
              </ProtectedRoute>

              <ProtectedRoute
                exact
                path="/forgot-password"
                unauthorisedUserOnly
              >
                <ForgotPasswordPage />
              </ProtectedRoute>

              <ProtectedRoute exact path="/reset-password" unauthorisedUserOnly>
                <ResetPasswordPage />
              </ProtectedRoute>

              <ProtectedRoute exact path="/profile">
                <ProfilePage />
              </ProtectedRoute>

              <Route exact path="/feed">
                <LentaPage />
              </Route>

              <Route path="*">
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
        </Router>
      </div>
    </div>
  );
};

export default App;
