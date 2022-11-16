import { useState, useEffect } from "react";
import { User } from "../../models/user";
import { Profile } from "../../models/profile";
import { ProfileCards } from "./ProfileCards";
import { Menu } from "../common/Menu";
import { Link } from "react-router-dom";
import { getProfiles } from "../../api";

export const HomepageLogged = () => {
    const [profiles, setProfiles] = useState([
        new Profile("Kyle", "Dallas", "This is a test", "Male", 24, "Quiet", "Appartment", 2),
        new Profile("Joe", "Austin", "This is another test", "Male", 19, "Smoke-free", "Condo", 3)
    ]); //will store list of profiles from api
    const [user, setUser] = useState(new User("John"));

    useEffect(() => {
        // setProfiles(getProfiles());
    }, []);


    if (!profiles) {
        return <>Loading...</>
    }

    return <>
        <header className="ms-2">
            <h1 className="mb-4">Find Your Roommate</h1>
        </header>
    
        <Menu
            text={"Menu"}
            options = {["My Profile", "My Roommates", "My Requests", "Sign Out"]}
            optionsSrcList = {["/profileEditor", "/roommate", "RequestList", "/LoginPage"]}
        />

        <div className="ms-3">
            <h2 id="homeViewHeading">Welcome, {user.name}</h2>
            <label className="me-2" htmlFor="filter">Sort By</label>
            <select type="text" id="sortBy" name="sortBy">
                <option></option>
                <option>Option 1</option>
                <option>Option 2</option>
            </select>

            <ProfileCards profiles={profiles} />

        </div>
    </>;
};