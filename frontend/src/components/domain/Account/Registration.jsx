//TODO add api and router stuff

import {useRef, useState, useEffect} from "react";
import { CredentialsField} from "../../common";
import { getProfile, createProfile, LoginCheck } from "../../../api";
import { Link, useNavigate } from "react-router-dom";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,11}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export const Registration = () => { 
    const errorRef = useRef();

    const [username, setUserName] = useState('');
    const [validUserName, setValidUserName] = useState(false);
    const [userNameFocus, setUserNameFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState('');
    const [validConfirm, setValidConfirm] = useState(false);
    const [confirmFocus, setConfirmFocus] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');
    const [registerSuccess, setRegisterSuccess] = useState(false);

    const nav = useNavigate();

    useEffect(() => {
        setValidUserName(USER_REGEX.test(username));
    }, [username]);

    useEffect(() => {
        setValidPassword(PASSWORD_REGEX.test(password));
        setValidConfirm(password === confirmPassword);
    }, [password, confirmPassword]);

    useEffect(() => {
        setErrorMessage('');
    }, [username, password, confirmPassword])

    const handleSubmit = async (e) => {
        e.preventDefault();
        //to prevent button from getting enabled with JS hack (not important)
        const v1 = USER_REGEX.test(username);
        const v2 = PASSWORD_REGEX.test(password);
        if (!v1 || !v2) {
            setErrorMessage("Invalid Entry");
            return;
        }

        //ADD API CALL HERE
        createProfile(username, password).then(x => {
            LoginCheck(username, password).then(y => {
                sessionStorage.setItem("username", username);
                sessionStorage.setItem("token", y);
            })
        });
        
        

    
        //set to true if account successfully created
        setRegisterSuccess(true);
        setUserName(username);
        setPassword(password);
        setConfirmFocus('');
        //display error messages if not created

    }

    return <> {registerSuccess ? (
        <div className="container py-4">
            <div className="bg-light rounded mx-auto col-xl-6 p-5 pb-1">
                <h1>Account Created!</h1>
                <p className="py-4">
                    <Link to={ `/ProfileEditor/${username}` }>Click here</Link> to create profile. 
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
                <h1>Register Your Account</h1>
                <CredentialsField label="Username:"
                        id="username"
                        value={username}
                        setValue={ name => setUserName( name ) }
                        setFocus={ x => setUserNameFocus( x ) } />
                <div className={userNameFocus && !validUserName ? "alert alert-primary" : "d-none"}>
                    4 to 12 characters.<br />
                    Must begin with a letter.<br />
                    Letters, numbers, underscores, hyphens allowed.
                </div>
                <CredentialsField label="Password:"
                        password={true}
                        id="password"
                        value={password}
                        setValue={ pwd => setPassword( pwd ) }
                        setFocus={ x => setPasswordFocus( x ) } />
                <p className={(passwordFocus||password) && !validPassword ? "alert alert-primary" : "d-none"}>
                    8 to 24 characters.<br />
                    Must include uppercase and lowercase letters, a number, and a special character.<br />
                    Allowed special characters: ! @ # $ %
                </p>
                <CredentialsField label="Confirm Password:"
                        password={true}
                        id="confirmPassword"
                        value={confirmPassword}
                        setValue={ confirmPwd => setConfirmPassword( confirmPwd ) }
                        setFocus={ x => setConfirmFocus( x ) } />
                <p className={(confirmFocus||confirmPassword) && !validConfirm ? "alert alert-primary" : "d-none"}>
                    Must match the first password input field.
                </p>
                <button type="button" className="btn btn-primary btn-lg col-12 mt-1 mb-2" 
                    disabled={!validUserName || !validPassword || !validConfirm ? true : false}
                    onClick={ handleSubmit }>
                    Sign Up
                </button>
                <hr/>
                <p className="mt-1">
                    Already have an account?
                    <Link to={ `/LoginPage` }>
                        Sign in
                    </Link>
                </p>
            </div>
        </div>)}
    </>;
};