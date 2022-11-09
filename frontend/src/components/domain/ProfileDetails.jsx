import { useState, useEffect } from "react";
import { getProfileByUserName } from "../../api";

export const ProfileDetails = () => {

    const [ profile, setProfile ] = useState(undefined);
    //TODO update for on click
    useEffect(() => {
        getProfileByUserName(1).then(x => setProfile(x));
    }, []);

    if(!profile) {
        return <>Error loading profile...</>;
    }
    //TODO update to show all important preferences
    return <>
        <div className="container">
            <div className="jumbotron bg-light rounded">
                <h1 className="display-4">hello</h1>
            </div>
        </div>
    </>;
};