import { Navigate, Outlet } from "react-router";

const PrivateRoute = ({ authStatus }) => {
  return authStatus === "authenticated" ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
