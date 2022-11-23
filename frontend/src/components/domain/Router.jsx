//TODO setup roommate api

import { Route, Routes } from "react-router-dom"
import { ProfileDetails, ProfileEditor, Registration, Login, HomepageNotLogged, RequestList, ProfileExplorer, Logout } from ".";
import { RoommateList } from ".";
import { RequireAuth } from ".";

export const Router = () => {

    const roomies = [
        {name: "Robert Derl", gender: "male", city: "DFW", age: 26, paragraph: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
        {name: "Dan Robins", gender: "male", city: "Dallas", age: 24, paragraph: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
    ];

    return <Routes>
        <Route path="/">

            {/* public routes*/}
            <Route path="/" element={ <HomepageNotLogged /> } exact />
            <Route path="/login" element= { <Login/> } />
            <Route path="/register" element= { <Registration/> } />
            <Route path="/logout" element= { <Logout/> } />

            {/* protected routes */}
            <Route element={<RequireAuth/>}>
                <Route path="/dashboard" element= { <ProfileExplorer/>} />
                <Route path="/requests" element= { <RequestList requests = { roomies } />} />
                <Route path="/roommates" element= { <RoommateList roommates = { roomies } standalone={true}/>} />
                <Route path="/profile" element= { <ProfileDetails/>} />
                <Route path="/:username" element= { <ProfileDetails/>} />
                <Route path="/profile/edit" element= { <ProfileEditor/>} />
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