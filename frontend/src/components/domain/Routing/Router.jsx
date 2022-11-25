//TODO setup roommate api

import { Route, Routes } from "react-router-dom"
import { HomePage, RequireAuth, Registration, Login, Logout, Missing } from "..";
import { ProfileExplorer, ProfileDetails, ProfileEditor, RoommateList, RequestList } from "..";


export const Router = () => {

    const roomies = [
        {name: "Robert Derl", gender: "male", city: "DFW", age: 26, paragraph: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
        {name: "Dan Robins", gender: "male", city: "Dallas", age: 24, paragraph: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
    ];

    return <Routes>
        <Route path="/">
            {/* public routes */}
            <Route path="/" element={ <HomePage /> } exact />
            <Route path="/login" element= { <Login/> } />
            <Route path="/register" element= { <Registration/> } />
            <Route path="/logout" element= { <Logout/> } />

            {/* account routes */}
            <Route element={<RequireAuth/>}>
                <Route path="/dashboard" element= { <ProfileExplorer/>} />
                <Route path="/requests" element= { <RequestList requests = { roomies } />} />
                <Route path="/roommates" element= { <RoommateList standalone={true}/>} />
                <Route path="/profile" element= { <ProfileDetails/>} />
                <Route path="/profile/edit" element= { <ProfileEditor/>} />
                <Route path="/:username/profile" element= { <ProfileDetails/>} />
            </Route>

            <Route path="*" element={<Missing/>} />
        </Route>
    </Routes>
};