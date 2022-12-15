import axios from "../api/axios";
import { useAuth } from "./useAuth";

export const useLogout = () => {
    const { setAuth } = useAuth();

    const logout = async () => {
        setAuth({});
        try {
            await axios('/session/logout', {
                withCredentials: true
            });
        } catch (err) {
            console.error(err);
        }
    }
    return logout;
};
