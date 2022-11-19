import { useState, useEffect } from 'react';
import { ProfileSearch, ResultList } from '../Dashboard';
import { getProfiles } from "../../../api";
import { Menu } from '../../common';
import { NavBar } from '../NavBar';
import { useParams } from 'react-router-dom';

export const ProfileExplorer = () => { 

    const roomies = [
        {name: "Robert Derl", gender: "male", city: "DFW", age: 26, "Night-owl":false,"Early-bird":false,"Smoke-free":false,"Pet-friendly":false},
        {name: "Dan Robins", gender: "male", city: "Dallas", age: 24, "Night-owl":true,"Early-bird":true,"Smoke-free":true,"Pet-friendly":true},
        {name: "Steve Jackson", gender: "male", city: "Fort Worth", age: 22, "Night-owl":true,"Early-bird":false,"Smoke-free":true,"Pet-friendly":false},
        {name: "Scott Dillon", gender: "female", city: "Austin", age: 21, "Night-owl":false,"Early-bird":true,"Smoke-free":false,"Pet-friendly":true},
        {name: "David Charles", gender: "female", city: "Dallas", age: 31, "Night-owl":false,"Early-bird":false,"Smoke-free":true,"Pet-friendly":false},
    ];

    const [profiles, setProfiles] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    const params = useParams();

    //TODO update for on click
    useEffect(() => {
        //getProfiles.then(x => setProfiles(x));
        setSearchResults(roomies);
    }, []);

    return <>
    <NavBar username={params.username}/>
        <div className="container py-4">
            <div className="bg-light rounded p-5 pb-4 mb-4">
                
                <ProfileSearch profiles={roomies} setSearchResults={setSearchResults}/>
                <ResultList results={searchResults}/>
            </div>
        </div>
    </>;
};