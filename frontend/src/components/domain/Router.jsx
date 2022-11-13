import { BrowserRouter, Route, Routes } from "react-router-dom"
import { HomepageLogged, ProfileDetails, ProfileEditor, Registration, Login, HomepageNotLogged } from ".";
import { RoommateList } from ".";

export const Router = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={ <HomepageNotLogged /> } exact />
            <Route path="/LoginPage" element= { <Login/> } />
            <Route path="/SignUpPage" element= { <Registration/> } />
            <Route path="/Logged" element= { <HomepageLogged/> } /> 
            <Route path="/profileDetail" element= { <ProfileDetails/> } /> 
            <Route path="/profileEditor" element= { <ProfileEditor/> } /> 
            <Route path="/roommate" element= { <RoommateList/> } /> 

        </Routes>
    </BrowserRouter>
};