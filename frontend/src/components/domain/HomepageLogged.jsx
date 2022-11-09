import { useState, useEffect } from "react";
import { User } from "../../models/user";
import { Profile } from "../../models/profile";
import { ProfileCards } from "./ProfileCards";

export const HomepageLogged = () => {
    const [profiles, setProfiles] = useState([
        new Profile("Kyle", "Dallas", "This is a test", "Male", 24, "Quiet", "Appartment", 2),
        new Profile("Joe", "Austin", "This is another test", "Male", 19, "Smoke-free", "Condo", 3)
    ]); //will store list of profiles from api
    const [user, setUser] = useState(new User("John"));

    useEffect(() => {
        //Get list of matching profiles from db
    }, []);


    // if (!profiles) {
    //     return <>Loading...</>
    // }

    return <>
        <header className="ms-2">
            <h1 className="mb-4">Find Your Roommate</h1>
        </header>

        <div className="dropdown">
            <button className="btn btn-primary dropdown-toggle" id="menuButton" type="button" data-bs-toggle="dropdown">Menu</button>
            <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Sample profile</a></li>
                <li><a className="dropdown-item" href="#">Log in</a></li>
                <li><a className="dropdown-item" href="#">Sign up</a></li>
            </ul>
        </div>

        <div className="ms-3">
            <h2 id="homeViewHeading">Welcome, {user.name}</h2>
                <label className = "me-2" htmlFor = "filter">Sort By</label>
                    <select type="text" id="sortBy" name="sortBy">
                        <option></option>
                        <option>Option 1</option>
                        <option>Option 2</option>
                    </select>

                <ProfileCards profiles={profiles}/>
                
        </div>

    </>;



    }
