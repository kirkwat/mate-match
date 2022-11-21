import { useNavigate } from "react-router-dom"
import { useEffect } from "react";

export const Logout = () => {
    const nav = useNavigate();
    
    useEffect(() => {
        delete sessionStorage.username;
        delete sessionStorage.token;
        nav("/LoginPage");
    }, [])

    



}