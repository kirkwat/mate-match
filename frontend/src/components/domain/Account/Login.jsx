//TODO add authprovider to router
//TODO add api and router stuff

import {useRef, useState, useEffect, useContext} from "react";
import {CredentialsField} from "../../common";
import { getProfileByUsername, getProfiles, LoginCheck} from "../../../api";
import AuthContext from "../../../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
    const errorRef = useRef();
    // const [auth, setAuth ] = useState(null);

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('Error. Wrong username or password');
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [token, setToken] = useState(null);

    useEffect(() => {
        setErrorMessage('');
    }, [username, password])

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        //Logs in user
        LoginCheck(username, password).then(x => {
            setToken(x);
            //TODO figure out way to authenticate password with db
                console.log(x);
                if (x != null) {
                    setLoginSuccess(true);
                    setUserName('');
                    setPassword('');
                    sessionStorage.setItem("username", username);
                    sessionStorage.setItem("token", x);
                }
            });
        };

    const nav = useNavigate();

    if (loginSuccess) {
        return <>
            <div className="container py-4">
                <div className="bg-light rounded mx-auto col-xl-6 p-5 pb-1">
                    <h1>Account Logged In!</h1>
                    <p className="py-4">
                        {nav(`/dashboard?name=${username}`)}
                    </p>
                </div>
            </div>
        </>;
    }

    
    return <> 
        <div className="container py-4">
            <div className="bg-light rounded mx-auto col-xl-6 p-5 pb-1">
                <div ref={errorRef} className={errorMessage ? "alert alert-danger" : "d-none"}>
                    {/*TODO add API error messages here*/}
                    {errorMessage}
                </div>
                <h1>Sign In</h1>
                <CredentialsField label="Username:"
                        id="username"
                        value={username}
                        setValue={ name => setUserName( name ) } />
                <CredentialsField label="Password:"
                        password={true}
                        id="password"
                        value={password}
                        setValue={ pwd => setPassword( pwd ) } />
                <button type="button" className="btn btn-primary btn-lg col-12 mt-1 mb-2" 
                    onClick={ handleSubmit }>
                    Sign In
                </button>
                <hr/>
                <p className="mt-1">
                    Don't have an account? 
                    <Link to={ `/SignUpPage` }>
                        Create an account
                    </Link>
                </p>
            </div>
        </div>
    </>;
};