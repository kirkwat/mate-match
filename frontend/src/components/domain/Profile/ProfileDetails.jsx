//TODO update button to show Send Request or Edit Profile depending on situation
//TODO make changes with api

import { useState, useEffect } from "react";
import { getProfileByUsername, Health, getProfiles } from "../../../api";
import { RoommateList } from './RoommateList';
import { useParams } from "react-router-dom";

export const ProfileDetails = () => {
    //DELETE - this is just an example until api is working
    const roomies = [
        {name: "Robert Derl", gender: "male", city: "DFW", age: 26, paragraph: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
        {name: "Dan Robins", gender: "male", city: "Dallas", age: 24, paragraph: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
    ];

    const [ profiles, setProfiles ] = useState(undefined);
    const [ profile, setProfile ] = useState(undefined);

    const param = useParams();


    //TODO update for on click
    useEffect(() => {
        getProfileByUsername(param.username).then(x => setProfile(x[0]));
    }, []);

    console.log(profile);

    
    if(!profile) {
       return <>Loading...</>;
    }

    return <>
        <div className="container py-4">
            <div className="bg-light rounded p-5 pb-4 mb-4">
                <img src="images/150.png" alt="default" className="float-end img-fluid img-thumbnail"/>
                <h1 className="display-5">
                    <span className="fw-bold">{profile.name}</span>
                    <span className="fs-1"> ({profile.gender})</span>
                </h1>
                <h3 className="display-7">
                    <span>{profile.city}</span>
                    <span> - {profile.age}</span>
                </h3>                        
                <p className="fs-5 col-8">{profile.bio}</p>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item bg-light"></li>
                    <li className="list-group-item bg-light">
                        <span className="fw-bold">Has Residence: </span>Yes
                    </li>
                    <li className="list-group-item bg-light">
                        <span className="fw-bold">Roommates needed: {profile.desiredRoomates}</span>
                    </li>
                    <li className="list-group-item bg-light">
                        <span className="fw-bold">Professional Preferences: </span>
                        working remotely, 9-5
                    </li>
                    <li className="list-group-item bg-light">
                        <span className="fw-bold">Lifestyle Preferences: </span>
                        no dogs, like to stay up late
                    </li>
                    <li className="list-group-item bg-light"></li>
                </ul>
                <button type="button" className="btn btn-primary btn-lg col-12 mt-3">
                    Send Roommate Request
                </button>
            </div>
            <div>
                <RoommateList roommates = { roomies } />
            </div>
        </div>
    </>;
};
