import axios from "../api/axios";
import { useAuth } from "./useAuth";

export const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/session/refresh", {
      withCredentials: true,
    });
    setAuth((prev) => {
      return { ...prev, ...response.data};
    });
    return response.data.accessToken;
  };
  return refresh;
};
