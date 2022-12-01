import { useLocation, Link } from "react-router-dom";
import { useAuth } from "../../../hooks";
import { NavBar } from "./NavBar";

export const Missing = () => {
    const { auth } = useAuth();

    return <>
        {auth?.username ? <NavBar/> : <></>}
        <div className="container pt-4 pb-5">
            <div className="bg-light rounded p-5 pb-4 mb-4">
                <h1 className="display-5">
                    <span className="fw-bold">404 Page not found</span>
                </h1>
                {auth?.username ? 
                    <Link to={ `/dashboard` }>
                        Return to the Dashboard
                    </Link>
                    : <Link to={ `/` }>
                        Return to the Home Page
                    </Link>
                }
            </div>
        </div>
    </>;
};