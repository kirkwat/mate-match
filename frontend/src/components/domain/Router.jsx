import { BrowserRouter, Route, Routes } from "react-router-dom"
import { HomepageLogged, ProfileDetails, ProfileEditor, SignupPage, LoginPage, HomepageNotLogged } from ".";
import { RoommateList } from ".";

export const Router = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={ <HomepageNotLogged /> } exact />
            <Route path="/LoginPage" element= { <LoginPage/> } />
            <Route path="/SignUpPage" element= { <SignupPage/> } />
            <Route path="/Logged" element= { <HomepageLogged/> } /> 
            <Route path="/profileDetail" element= { <ProfileDetails/> } /> 
            <Route path="/profileEditor" element= { <ProfileEditor/> } /> 
            <Route path="/roommate" element= { <RoommateList/> } /> 

        </Routes>
    </BrowserRouter>
};