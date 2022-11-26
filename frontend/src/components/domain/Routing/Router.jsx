import { Route, Routes } from "react-router-dom"
import { HomePage, RequireAuth, Registration, Login, Logout, Missing } from "..";
import { ProfileExplorer, ProfileDetails, ProfileEditor, RoommateList, RequestList } from "..";

export const Router = () => {
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
                <Route path="/requests" element= { <RequestList/>} />
                <Route path="/roommates" element= { <RoommateList standalone={true}/>} />
                <Route path="/profile" element= { <ProfileDetails/>} />
                <Route path="/profile/edit" element= { <ProfileEditor/>} />
                <Route path="/:username/profile" element= { <ProfileDetails/>} />
            </Route>

            <Route path="*" element={<Missing/>} />
        </Route>
    </Routes>
};