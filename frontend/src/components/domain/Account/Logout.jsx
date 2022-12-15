import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { handleLogout } from "../../../api";
import { useAuth } from "../../../hooks";

export const Logout = () => {
  const { setAuth } = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    setAuth({});
    handleLogout();
    nav("/");
  }, []);
};
