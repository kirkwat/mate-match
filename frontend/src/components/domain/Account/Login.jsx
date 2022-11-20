//TODO add authprovider to router
//TODO add api and router stuff

import {useRef, useState, useEffect, useContext} from "react";
import {CredentialsField} from "../../common";
import { getProfileByUsername, getProfiles} from "../../../api";
import AuthContext from "../../../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
    const errorRef = useRef();
    const { setAuth } = useContext(AuthContext);

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false);

    useEffect(() => {
        setErrorMessage('');
    }, [username, password])

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        //Logs in user
        getProfileByUsername(username).then(profile => {
            //TODO figure out way to authenticate password with db
            if (profile.password == password) {     //this currently doesn't work
                //set to true if account successfully logged in
                setLoginSuccess(true);
                setUserName('');
                setPassword('');
                sessionStorage.setItem("username", username);
            }

        });
    }

    const nav = useNavigate();

    return <> {loginSuccess ? (
        <div className="container py-4">
            <div className="bg-light rounded mx-auto col-xl-6 p-5 pb-1">
                <h1>Account Logged In!</h1>
                <p className="py-4">
                    {nav(`/dashboard?name=${username}`)}
                </p>
            </div>
        </div>
        ) : (
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
        </div>)}
    </>;
};