import { useState, useEffect } from "react";
import { Menu, CredentialsField } from "../../common";

export const Login = () => { 
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    //Add functionality to get username/passwword from db and see if it matches

    if (false) {    //If username or password is incorrect
        return <>I
            <p className="d-flex align-items-center justify-content-center mb-3">Incorrect username or password. Try again.</p>
            <div className = "d-flex align-items-center justify-content-center mb-3">
                <button type = "button" className = "btn btn-primary">Back</button>
            </div>
        </>;
    }

    return <>
        <Menu
                text="Menu"
                options={["Home", "Signup"]}
                optionsSrcList={["", ""]}
            />
        <div className="d-flex align-items-center justify-content-center mb-2">
            <h1 className = "">Log in</h1>
        </div>

        <div className="d-flex align-items-center justify-content-center">
            <CredentialsField
                label={"Username"}
                value = {username}
                setValue = {x => setUsername(x)}
            />
        </div>

        <div className="d-flex align-items-center justify-content-center">
            <CredentialsField
                label={"Password"}
                value = {password}
                setValue = {x => setPassword(x)}
                password = {true}
            />  
         </div>

        <div className = "d-flex align-items-center justify-content-center mb-3">
            <button type = "button" className = "btn btn-primary">Log in</button>
        </div>
    
    </>;
  
}