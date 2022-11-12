import { useState, useEffect } from "react";
import { Menu } from "../common/Menu";
import { CredentialsField } from "../common/credentialsField";
import { Link } from "react-router-dom";

export const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    //Add functionality to get username/passwword from db and see if it matches

    if (false) {    //If username or password is incorrect
        return <>I
            <p className="d-flex align-items-center justify-content-center mb-3">Incorrect username or password. Try again.</p>
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
                <Link to={`/SignUpPage`}>
                    <li className="dropdown-item">Sign Up</li>
                </Link>
            </ul>
        </div>


        <div className="d-flex align-items-center justify-content-center mb-2">
            <h1 className="">Log in</h1>
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
                password={true}
            />
        </div>

        <Link to={ `/Logged` }>
            <div className="d-flex align-items-center justify-content-center mb-3">
                <button type="button" className="btn btn-primary">Log in</button>
            </div>
        </Link>
    </>;
}