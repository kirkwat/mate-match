import { useState, useEffect } from "react";
import { Menu } from "../common/Menu";
import { CredentialsField } from "../common/credentialsField";

export const LoginPage = () => { 
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

        <CredentialsField
            label={"Username"}
            value = {username}
            setValue = {x => setUsername(x)}
        
        />

        <CredentialsField
            label={"Password"}
            value = {password}
            setValue = {x => setPassword(x)}
            password = {true}
        
        />  

        <div className = "d-flex align-items-center justify-content-center mb-3">
            <button type = "button" className = "btn btn-primary">Log in</button>
        </div>
    
    </>;
  
}