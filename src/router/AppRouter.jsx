import { Navigate, Route, Routes } from "react-router";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProfilePage from "../pages/ProfilePage";
import TasksPage from "../pages/TasksPage";

const AppRouter = ({ authStatus, onLogin, onLogout }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Navigate to={authStatus === "authenticated" ? "/home" : "/login"} />
        }
      />

      <Route element={<PublicRoute authStatus={authStatus} />}>
        <Route path="/login" element={<LoginPage onLoginSuccess={onLogin} />} />
        <Route path="/register" element={<RegisterPage onLoginSuccess={onLogin} />} />
      </Route>

      <Route element={<PrivateRoute authStatus={authStatus} />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage onLogout={onLogout} />} />
        <Route path="/tasks" element={<TasksPage />} />
      </Route>

      <Route
        path="*"
        element={
          <Navigate to={authStatus === "authenticated" ? "/home" : "/login"} />
        }
      />

    </Routes>
  );
};

export default AppRouter;
