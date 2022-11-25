//TODO send roommate request
//TODO don't allow sending requests to someone who is already your roommate
//TODO api get preferences

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProfileByUsername, getProfileByUsername2 } from "../../../api";
import { useAuth } from "../../../hooks";
import { RoommateList } from './RoommateList';
import { useParams } from "react-router-dom";
import './styles/avatar.css';

export const ProfileDetails = () => {
    const { auth } = useAuth();
    const params = useParams();

    //DELETE - this is just an example until api is working
    const prefs = {
        apartment: true,
        house: true,
        condo: true,

        nightPerson: true,
        morningPerson: true,
        shareFood: true,
        pets: true,

        extrovert: true,
        introvert: true,
        bringFriendsOver: true,

        loud: true,
        messy: true,
        smoker: true,
    };

    const [ profile, setProfile ] = useState(undefined);
    const [ preferences, setPreferences ] = useState(undefined);

    useEffect(() => {
        if (params.username) {
            getProfileByUsername2(params.username,auth).then(x => setProfile(x[0]));
            //TODO get preferences
        } else {
            getProfileByUsername(auth).then(x => setProfile(x[0]));
            //TODO get preferences
        }
    }, [params]);

    if(!profile) {
        return <>
        <div className="container py-4">
            <div className="bg-light rounded p-5 pb-4 mb-4">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading Profile...</span>
                </div>
                <span className="fs-2 fw-bold">&nbsp;Loading Profile...</span>
            </div>
        </div>
    </>;
    }

    return <>
        <div className="container py-4">
            <div className="bg-light rounded p-5 pb-4 mb-4">
                <div className="avatar-image float-end">
                    <img src={profile.photoID?profile.photoID:"images/default.jpg"} alt="avatar" className="img-fluid avatar"/>
                </div>
                <h1 className="display-5">
                    <span className="fw-bold">{profile.name}</span>
                    <span className="fs-1"> {profile.gender === "male"?"(He/Him)":"(She/Her)"}</span>
                </h1>
                <h3 className="display-7">
                    <span>{profile.city}</span>
                    <span> - {profile.age}</span>
                </h3>                        
                <p className="fs-5 col-8">{profile.bio}</p>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item bg-light"></li>
                    <li className="list-group-item bg-light">
                        <span className="fw-bold">Roommates needed:&nbsp;</span>
                        {profile.desiredRoomates}
                    </li>
                    <li className="list-group-item bg-light">
                        <span className="fw-bold">Property Preferences:&nbsp;</span>
                        <span className={prefs["apartment"]?"":"d-none"}>Apartment</span>
                        <span className={prefs["apartment"]&&(prefs["house"]||prefs["condo"])?"":"d-none"}>,&nbsp;</span>
                        <span className={prefs["house"]?"":"d-none"}>House</span>
                        <span className={prefs["house"]&&prefs["condo"]?"":"d-none"}>,&nbsp;</span>
                        <span className={prefs["condo"]?"":"d-none"}>Condo</span>
                    </li>
                    <li className="list-group-item bg-light">
                        <span className="fw-bold">Lifestyle Preferences:&nbsp;</span>
                        <span className={prefs["nightPerson"]?"":"d-none"}>Night-owl</span>
                        <span className={prefs["nightPerson"]&&(prefs["morningPerson"]||prefs["shareFood"]||prefs["pets"])?"":"d-none"}>,&nbsp;</span>
                        <span className={prefs["morningPerson"]?"":"d-none"}>Early-bird</span>
                        <span className={prefs["morningPerson"]&&(prefs["shareFood"]||prefs["pets"])?"":"d-none"}>,&nbsp;</span>
                        <span className={prefs["pets"]?"":"d-none"}>Pet-friendly</span>
                        <span className={prefs["pets"]&&prefs["shareFood"]?"":"d-none"}>,&nbsp;</span>
                        <span className={prefs["shareFood"]?"":"d-none"}>Likes to share food</span>
                    </li>
                    <li className="list-group-item bg-light">
                        <span className="fw-bold">Personality:&nbsp;</span>
                        <span className={prefs["extrovert"]?"":"d-none"}>Extrovert</span>
                        <span className={prefs["extrovert"]&&(prefs["introvert"]||prefs["bringFriendsOver"])?"":"d-none"}>,&nbsp;</span>
                        <span className={prefs["introvert"]?"":"d-none"}>Introvert</span>
                        <span className={prefs["introvert"]&&prefs["bringFriendsOver"]?"":"d-none"}>,&nbsp;</span>
                        <span className={prefs["bringFriendsOver"]?"":"d-none"}>Likes to bring friends over</span>
                    </li>
                    <li className="list-group-item bg-light">
                        <span className="fw-bold">Important to Know:&nbsp;</span>
                        <span className={prefs["loud"]?"":"d-none"}>Loud</span>
                        <span className={prefs["loud"]&&(prefs["messy"]||prefs["smoker"])?"":"d-none"}>,&nbsp;</span>
                        <span className={prefs["messy"]?"":"d-none"}>Messy</span>
                        <span className={prefs["messy"]&&prefs["smoker"]?"":"d-none"}>,&nbsp;</span>
                        <span className={prefs["smoker"]?"":"d-none"}>Likes to smoke</span>
                    </li>
                    <li className="list-group-item bg-light"></li>
                </ul>
                {params.username ? (
                    <button type="button" className={"btn btn-primary btn-lg col-12 mt-3"}>
                        {/* add api post send request here */}
                        Send Roommate Request
                    </button>
                ) : (
                    <Link to={`edit`} className="btn btn-primary btn-lg col-12 mt-3">
                        Edit Profile
                    </Link>
                )}
            </div>
            <div>
                <RoommateList username={params.username?params.username:false} />
            </div>
        </div>
    </>;
};