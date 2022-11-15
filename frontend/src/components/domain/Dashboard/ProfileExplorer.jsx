import { useState, useEffect } from 'react';
import { ProfileSearch, SearchResults, ProfileList } from '../Dashboard';
import { getProfiles } from "../../../api";

export const ProfileExplorer = () => { 

    const roomies = [
        {name: "Robert Derl", gender: "male", city: "DFW", age: 26, paragraph: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
        {name: "Dan Robins", gender: "male", city: "Dallas", age: 24, paragraph: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
    ];

    const [profiles, setProfiles] = useState(
        [{name:"kirk",city:"dallas",age:21},{name:"robert",city:"dfw",age:22}])
    const [searchResults, setSearchResults] = useState([])
    //TODO update for on click
    useEffect(() => {
        //getProfiles.then(x => setProfiles(x));
    }, []);

    

    return <>
        <div className="container py-4">
            <div className="bg-light rounded p-5 pb-4 mb-4">
                <ProfileList results={roomies}/>
            </div>
        </div>
    </>;
};

//<ProfileSearch profiles={profiles} setSearchResults={setSearchResults}/>
//<SearchResults results={profiles}/>