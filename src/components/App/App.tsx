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

              <ProtectedRoute exact path="/profile" >
                <ProfilePage />
              </ProtectedRoute>

              <Route exact path="/feed">
                <LentaPage />
              </Route>

              <Route exact path="/ingredients/:ingredientId">
                <IngredientPage />
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
