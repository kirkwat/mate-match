//TODO api get preferences

import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProfileByUsername, getProfileByUsername2, sendRequest, checkRequests, getRoommates } from "../../../api";
import { useAuth } from "../../../hooks";
import { RoommateList } from './RoommateList';
import { useParams } from "react-router-dom";
import './styles/avatar.css';

export const ProfileDetails = () => {
    const { auth } = useAuth();
    const params = useParams();
    const navigate = useNavigate();

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
    const [ roommate, setRoommate ] = useState(undefined); 
    const [ request, setRequest ] = useState(undefined); 

    const [ preferences, setPreferences ] = useState(undefined);

    useEffect(() => {
        if (params.username) {
            getProfileByUsername2(params.username,auth).then(x => setProfile(x[0]));
            checkRequests(params.username,auth.username,auth).then(x => setRequest(x[0]));
            //TODO get preferences
        } else {
            getProfileByUsername(auth).then(x => setProfile(x[0]));
            //TODO get preferences
        }
        getRoommates(auth.username,auth).then(x => {
            setRoommate(x[0]?Object.values(x[0]).find(email => email === params.username):undefined);
        });
    }, [params]);

    const handleSendRequest = () => {
        sendRequest({to:params.username,from:auth.username},auth);
        navigate(`/requests`);
    };

    if(!profile) {
        return <>
        <div className="container py-4">
            <div className="bg-light rounded p-5 pb-4 mb-4">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading Profile...</span>
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
                    <span className="fs-1"> {profile.desired_gender === "male"?"(He/Him)":"(She/Her)"}</span>
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
                        {profile.desired_roommates}
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
                {!params.username ? (
                    <Link to={`edit`} className="btn btn-primary btn-lg col-12 mt-3">
                        Edit Profile
                    </Link>
                ) : request ? (
                        <button type="button" 
                            className="btn btn-primary btn-lg col-12 mt-3"
                            disabled={true}
                            onClick= {handleSendRequest}>
                            Roommate Request Sent!
                        </button>
                    ) : (
                        <button type="button" 
                            className={roommate?"d-none":"btn btn-primary btn-lg col-12 mt-3"}
                            onClick= {handleSendRequest}>
                            Send Roommate Request
                        </button>
                    )
                }
            </div>
            <div>
                <RoommateList username={params.username?params.username:false} />
            </div>
        </div>
    </>;
};