import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../hooks";

export const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.username
            ? <Outlet/>
            : <Navigate to="/" state={{ from: location }} replace />
    );
};