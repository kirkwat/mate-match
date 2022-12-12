import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../hooks";
import { NavBar } from "./NavBar";

export const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.username ? (
    <>
      <NavBar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};
