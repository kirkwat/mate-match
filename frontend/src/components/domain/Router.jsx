import { BrowserRouter, Route, Routes } from "react-router-dom"
import { HomepageLogged, ProfileDetails, ProfileEditor, Registration, Login, HomepageNotLogged, RequestList, ProfileExplorer, HandleRedirect, Logout } from ".";
import { RoommateList } from ".";
import { Layout } from ".";
import { RequireAuth } from ".";

export const Router = () => {
    return <Routes>
        <Route path="/" element={<Layout/>}>
            {/* public routes*/}
            <Route path="/" element={ <HomepageNotLogged /> } exact />
            <Route path="/login" element= { <Login/> } />
            <Route path="/register" element= { <Registration/> } />
            <Route path="/logout" element= { <Logout/> } />

            {/* protected routes*/}
            <Route element={<RequireAuth/>}>
                <Route path="/dashboard/" element= { <HandleRedirect page={"dashboard"}/> } /> 
                <Route path="/dashboard/:username" element= { <ProfileExplorer/> } /> 
                <Route path="/profileDetails/:username" element= { <ProfileDetails/> } /> 
                <Route path="/profileEditor/" element= { <HandleRedirect page={"editor"}/> } />
                <Route path="/profileEditor/:username" element= { <ProfileEditor/> } /> 
                <Route path="/roommate" element= { <RoommateList/> } /> 
                <Route path="/RequestList" element= {<RequestList/>} />
            </Route>

            {/* TODO catchall 404 page*/}
            <Route path="*" element={<Login/>} />

        </Route>
    </Routes>
};



/*
export const Router = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={ <HomepageNotLogged /> } exact />
            <Route path="/LoginPage" element= { <Login/> } />
            <Route path="/Logout" element= { <Logout/> } />
            <Route path="/SignUpPage" element= { <Registration/> } />
            <Route path="/dashboard/" element= { <HandleRedirect page={"dashboard"}/> } /> 
            <Route path="/dashboard/:username" element= { <ProfileExplorer/> } /> 
            <Route path="/profileDetails/:username" element= { <ProfileDetails/> } /> 
            <Route path="/profileEditor/" element= { <HandleRedirect page={"editor"}/> } />
            <Route path="/profileEditor/:username" element= { <ProfileEditor/> } /> 
            <Route path="/roommate" element= { <RoommateList/> } /> 
            <Route path="/RequestList" element= {<RequestList/>} />
        </Routes>
    </BrowserRouter>
};
*/