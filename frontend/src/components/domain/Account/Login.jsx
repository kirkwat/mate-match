//TODO add authprovider to router
//TODO add api and router stuff

import {useRef, useState, useEffect, useContext} from "react";
import { TextField, PasswordField} from "../../common";
import AuthContext from "../../../context/AuthProvider";

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
        //ADD API CALL HERE
        //set to true if account successfully logged in
        setLoginSuccess(true);
        setUserName('');
        setPassword('');
        //display error messages if not logged in
        
    }

    return <> {loginSuccess ? (
        <div className="container py-4">
            <div className="bg-light rounded mx-auto col-xl-6 p-5 pb-1">
                <h1>Account Logged In!</h1>
                <p className="py-4">
                    {/*TODO put dashboard router link here*/}
                    TODO redirect to dashboard router link here
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
                <TextField label="Username:"
                        id="username"
                        value={username}
                        setValue={ name => setUserName( name ) } />
                <PasswordField label="Password:"
                        id="password"
                        value={password}
                        setValue={ pwd => setPassword( pwd ) } />
                <button type="button" className="btn btn-primary btn-lg col-12 mt-1 mb-2" 
                    onClick={ handleSubmit }>
                    Sign Up
                </button>
                <hr/>
                <p className="mt-1">
                    {/*TODO put sign-in router link here*/}
                    Don't have an account? <a href="#"> Create an account</a>
                </p>
            </div>
        </div>)}
    </>;
};