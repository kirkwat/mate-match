import { useState, useEffect } from "react";
import { Menu } from "../common/Menu";
import { CredentialsField } from "../common/credentialsField";

export const SignupPage = () => { 
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    //Add functionality to store username/passwword to db
    
    
    return <>
        <Menu
                text="Menu"
                options={["Home", "Login"]}
                optionsSrcList={["", ""]}
            />
        <div className="d-flex align-items-center justify-content-center mb-2">
            <h1 className = "">Sign Up</h1>
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
        
        />  

        <CredentialsField
            label={"Confirm password"}
            value = {confirmPassword}
            setValue = {x => setConfirmPassword(x)}
        />

        <div className = "d-flex align-items-center justify-content-center mb-3">
            <button type = "button" className = "btn btn-primary">Sign up</button>
        </div>
    
    </>;
  
}