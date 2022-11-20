import { useEffect } from "react"
import { useNavigate } from "react-router-dom";


export const HandleRedirect = ({page}) => { 
    const nav = useNavigate();

    const username = sessionStorage.getItem("username");
    
    useEffect(() => {
        if (username != null && page === "dashboard") {
            nav(`/dashboard/${username}`);
        }
    
        else if (username != null && page === "editor") {
            nav(`/profileEditor/${username}`);
        }
    
        else {
            nav(`/LoginPage`);
        }
    }, []);
}

