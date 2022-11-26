import { useState, useEffect } from 'react';
import { useAuth } from "../../../hooks";
import { getProfiles } from "../../../api";
import { ProfileSearch, ResultList } from '../Dashboard';

export const ProfileExplorer = () => {
    const { auth } = useAuth();

    const roomies = [
        {name: "Robert Derl", gender: "male", city: "DFW", age: 26, "Night-owl":false,"Early-bird":false,"Smoke-free":false,"Pet-friendly":false},
        {name: "Dan Robins", gender: "male", city: "Dallas", age: 24, "Night-owl":true,"Early-bird":true,"Smoke-free":true,"Pet-friendly":true},
        {name: "Steve Jackson", gender: "male", city: "Fort Worth", age: 22, "Night-owl":true,"Early-bird":false,"Smoke-free":true,"Pet-friendly":false},
        {name: "Scott Dillon", gender: "female", city: "Austin", age: 21, "Night-owl":false,"Early-bird":true,"Smoke-free":false,"Pet-friendly":true},
        {name: "David Charles", gender: "female", city: "Dallas", age: 31, "Night-owl":false,"Early-bird":false,"Smoke-free":true,"Pet-friendly":false},
    ];

    const [profiles, setProfiles] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    //TODO update for on click
    useEffect(() => {
        getProfiles(auth).then(x => setProfiles(x));
        //setSearchResults(roomies);
    }, []);

    return <>
        <div className="container py-4">
            <div className="bg-light rounded p-5 pb-4 mb-4">
                <ProfileSearch profiles={roomies} setSearchResults={setSearchResults}/>
                <ResultList results={searchResults}/>
            </div>
        </div>
    </>;
};