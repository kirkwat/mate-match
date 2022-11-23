import { BrowserRouter } from "react-router-dom";
import {  ProfileDetails, NavBar, ProfileEditor, ProfileExplorer, Login, Registration, HomepageNotLogged, RoommateList } from "./domain";
import { Router } from "./domain";
import { AuthProvider } from '../context/AuthProvider';


//export const App = () => <Router/>;
export const App = () => <AuthProvider>
    <Router/>
</AuthProvider>;