import { useState, useEffect } from 'react';
import { useAuth } from "../../../hooks";
import { getProfiles } from "../../../api";
import { ProfileSearch, ResultList } from '../Dashboard';

export const ProfileExplorer = () => {
    const { auth } = useAuth();

    const [profiles, setProfiles] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        getProfiles(auth).then(x => {
            setProfiles(x.filter(y => y.email !== auth.username && y.name !== null));
            setSearchResults(x.filter(y => y.email !== auth.username && y.name !== null));
        });
    }, []);

    return <>
        <div className="container pt-4 pb-5">
            <div className="bg-light rounded p-5 pb-4 mb-4">
                <ProfileSearch profiles={profiles} setSearchResults={setSearchResults}/>
                <ResultList results={searchResults}/>
            </div>
        </div>
    </>;
};