import { useState, useEffect } from "react";
import { Menu } from "../common/Menu";
import { CredentialsField } from "../common/credentialsField";
import { Link } from "react-router-dom";

export const SignupPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    //Add functionality to store username/passwword to db

    if (false) { //If username is already taken
        return <>I
            <p className="d-flex align-items-center justify-content-center mb-3">Username already taken</p>
            <div className="d-flex align-items-center justify-content-center mb-3">
                <button type="button" className="btn btn-primary">Back</button>
            </div>
        </>;
    }


    return <>
        <div className="dropdown">
            <button className="btn btn-primary dropdown-toggle" id="menuButton" type="button" data-bs-toggle="dropdown">Menu</button>
            <ul className="dropdown-menu">
                <Link to={`/`}>
                    <li className="dropdown-item">Home</li>
                </Link>
                <Link to={`/LoginPage`}>
                    <li className="dropdown-item">Log In</li>
                </Link>
            </ul>
        </div>

        <div className="d-flex align-items-center justify-content-center mb-2">
            <h1 className="">Sign Up</h1>
        </div>

        <div className="d-flex align-items-center justify-content-center">
            <CredentialsField
                label={"Username"}
                value={username}
                setValue={x => setUsername(x)}
            />
        </div>
        <div className="d-flex align-items-center justify-content-center">
            <CredentialsField
                label={"Password"}
                value={password}
                setValue={x => setPassword(x)}
            />
        </div>
        <div className="d-flex align-items-center justify-content-center">
            <CredentialsField
                label={"Confirm password"}
                value={confirmPassword}
                setValue={x => setConfirmPassword(x)}
            />
        </div>

        <Link to={ `/Logged` }>
            <div className="d-flex align-items-center justify-content-center mb-3">
                <button type="button" className="btn btn-primary">Sign up</button>
            </div>
        </Link>

    </>;

}