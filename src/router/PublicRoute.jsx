import { Navigate, Outlet } from "react-router";

const PublicRoute = ({ authStatus }) => {
  return authStatus === "authenticated" ? <Navigate to="/home" /> : <Outlet />;
};

export default PublicRoute;
