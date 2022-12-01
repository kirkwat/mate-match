import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginCheck} from "../../../api";
import { useAuth } from "../../../hooks";
import { CredentialsField, PlainNavBar } from "../../common";

export const Login = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setErrorMessage('');
    }, [username, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        LoginCheck(username, password).then(accessToken => {
            if (accessToken != null) {
                setAuth({ username, accessToken });
                setUserName('');
                setPassword('');
                navigate(`/dashboard`);
            }
            else {
                setErrorMessage("Unsuccessful login attempt. Please try again.");
            }
        });
    };

    return <> 
        <PlainNavBar/>
        <div className="container pt-4 pb-5">
            <div className="bg-light rounded mx-auto col-xl-6 p-3 p-md-5 pb-4 mb-4">
                <div className={errorMessage ? "alert alert-danger" : "d-none"}>
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
                    Don't have an account?&nbsp;
                    <Link to={ `/register` }>
                        Create an account
                    </Link>
                </p>
            </div>
        </div>
    </>;
};