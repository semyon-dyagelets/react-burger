import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { AppHeader } from "../AppHeader/AppHeader";

import AppStyles from "./App.module.css";
import { LoginPage } from "../../pages/LoginPage/Login";
import { RegisterPage } from "../../pages/RegisterPage/Register";
import { ForgotPasswordPage } from "../../pages/ForgotPasswordPage/ForgotPassword";
import { ResetPasswordPage } from "../../pages/ResetPasswordPage/ResetPassword";
import { NotFound404Page } from "../../pages/NotFound404Page/NotFound404";
import { MainPage } from "../../pages/MainPage/MainPage";
import { ProfilePage } from "../../pages/ProfilePage/Profile";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";
import { LentaPage } from "../../pages/LentaPage/Lenta";
import { IngredientPage } from "../../pages/IngredientPage/IngredientPage";

const App = () => {
  return (
    <div className={AppStyles.app}>
      <div className={AppStyles.page}>
        <Router>
          <AppHeader />
          <main className={AppStyles.main}>
            <Switch>
              <Route exact path="/">
                <MainPage />
              </Route>

              <Route exact path="/login">
                <LoginPage />
              </Route>

              <Route exact path="/register">
                <RegisterPage />
              </Route>

              <Route exact path="/forgot-password">
                <ForgotPasswordPage />
              </Route>

              <Route exact path="/reset-password">
                <ResetPasswordPage />
              </Route>

              <ProtectedRoute exact path="/profile">
                <ProfilePage />
              </ProtectedRoute>

              <ProtectedRoute exact path="/lenta">
                <LentaPage/>
              </ProtectedRoute>

              <Route exact path="/ingredients/:ingredientId">
                <IngredientPage/>
              </Route>

              <Route path="*">
                <NotFound404Page />
              </Route>
            </Switch>
          </main>
        </Router>
      </div>
    </div>
  );
};

export default App;
