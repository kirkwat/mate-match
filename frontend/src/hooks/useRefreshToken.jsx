import axios from "../api/axios";
import { useAuth } from "./useAuth";

export const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/session/refresh", {
      withCredentials: true,
    });
    setAuth((prev) => {
      return { ...prev, username: response.data.username, accessToken: response.data.accessToken };
    });
    return response.data;
  };
  return refresh;
};
