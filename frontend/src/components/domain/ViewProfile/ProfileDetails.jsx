import { useState, useEffect } from "react";
import { getProfileByUserName } from "../../../api";
import { RoommateList } from './RoommateList';

export const ProfileDetails = () => {
    //DELETE - this is just an example until api is working
    const roomies = [
        {name: "Robert Derl", gender: "(He/Him)", city: "DFW", age: 26, paragraph: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
        {name: "Dan Robins", gender: "(He/Him)", city: "Dallas", age: 24, paragraph: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
    ];


    const [ profile, setProfile ] = useState(undefined);
    //TODO update for on click
    useEffect(() => {
        //getProfileByUserName(1).then(x => setProfile(x));
    }, []);

    if(!profile) {
        return <>Error loading profile...</>;
    }

    return <>
        <div className="container py-4">
            <div className="bg-light rounded p-5 pb-4 mb-4">
                <img src="images/150.png" alt="default" className="float-end img-fluid img-thumbnail"/>
                <h1 className="display-5">
                    <span className="fw-bold">Kirk Watson</span>
                    <span className="fs-1"> (He/Him)</span>
                </h1>
                <h3 className="display-7">
                    <span>DTX</span> -
                    <span> 21</span>
                </h3>                        
                <p className="fs-5 col-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item bg-light"></li>
                    <li class="list-group-item bg-light">
                        <span className="fw-bold">Has Residence: </span>Yes
                    </li>
                    <li class="list-group-item bg-light">
                        <span className="fw-bold">Roommates needed: </span>5
                    </li>
                    <li class="list-group-item bg-light">
                        <span className="fw-bold">Professional Preferences: </span>
                        working remotely, 9-5
                    </li>
                    <li class="list-group-item bg-light">
                        <span className="fw-bold">Lifestyle Preferences: </span>
                        no dogs, like to stay up late
                    </li>
                    <li class="list-group-item bg-light"></li>
                </ul>
                <button type="button" className="btn btn-primary btn-lg col-12 mt-3">
                    Send Roommate Request
                </button>
            </div>
            <RoommateList roommates={roomies}></RoommateList>
        </div>
    </>;
};
