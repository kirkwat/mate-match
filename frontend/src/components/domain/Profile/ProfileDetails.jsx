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

    const [ profile, setProfile ] = useState(undefined);
    const [ roommate, setRoommate ] = useState(undefined); 
    const [ request, setRequest ] = useState(undefined); 

    useEffect(() => {
        if (params.username) {
            getProfileByUsername2(params.username,auth).then(x => setProfile(x[0]));
            checkRequests(params.username,auth.username,auth).then(x => setRequest(x[0]));
        } else {
            getProfileByUsername(auth).then(x => setProfile(x[0]));
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
    {console.log(profile)}
        <div className="container py-4">
            <div className="bg-light rounded p-5 pb-4 mb-4">
                <div className="avatar-image float-end">
                    <img src={profile.photoID?profile.photoID:"images/default.jpg"} 
                        alt="avatar" className="img-fluid"/>
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
                        {profile.desired_roommates}
                    </li>
                    <li className="list-group-item bg-light">
                        <span className="fw-bold">Property Preferences:&nbsp;</span>
                        <span className={profile["apartment"]?"":"d-none"}>Apartment</span>
                        <span className={profile["apartment"]&&(profile["house"]||profile["condo"])?"":"d-none"}>,&nbsp;</span>
                        <span className={profile["house"]?"":"d-none"}>House</span>
                        <span className={profile["house"]&&profile["condo"]?"":"d-none"}>,&nbsp;</span>
                        <span className={profile["condo"]?"":"d-none"}>Condo</span>
                    </li>
                    <li className="list-group-item bg-light">
                        <span className="fw-bold">Lifestyle Preferences:&nbsp;</span>
                        <span className={profile["nightPerson"]?"":"d-none"}>Night-owl</span>
                        <span className={profile["nightPerson"]&&(profile["morningPerson"]||profile["shareFood"]||profile["pets"])?"":"d-none"}>,&nbsp;</span>
                        <span className={profile["morningPerson"]?"":"d-none"}>Early-bird</span>
                        <span className={profile["morningPerson"]&&(profile["shareFood"]||profile["pets"])?"":"d-none"}>,&nbsp;</span>
                        <span className={profile["pets"]?"":"d-none"}>Pet-friendly</span>
                        <span className={profile["pets"]&&profile["shareFood"]?"":"d-none"}>,&nbsp;</span>
                        <span className={profile["shareFood"]?"":"d-none"}>Likes to share food</span>
                    </li>
                    <li className="list-group-item bg-light">
                        <span className="fw-bold">Personality:&nbsp;</span>
                        <span className={profile["extrovert"]?"":"d-none"}>Extrovert</span>
                        <span className={profile["extrovert"]&&(profile["introvert"]||profile["bringFriendsOver"])?"":"d-none"}>,&nbsp;</span>
                        <span className={profile["introvert"]?"":"d-none"}>Introvert</span>
                        <span className={profile["introvert"]&&profile["bringFriendsOver"]?"":"d-none"}>,&nbsp;</span>
                        <span className={profile["bringFriendsOver"]?"":"d-none"}>Likes to bring friends over</span>
                    </li>

                    <li className="list-group-item bg-light">
                        <span className="fw-bold">Important to Know:&nbsp;</span>
                        <span className={profile["loud"]?"":"d-none"}>Loud</span>
                        <span className={profile["loud"]&&(profile["messy"]||profile["smoker"]||profile["relationship"])?"":"d-none"}>,&nbsp;</span>
                        <span className={profile["messy"]?"":"d-none"}>Messy</span>
                        <span className={profile["messy"]&&(profile["smoker"]||profile["relationship"])?"":"d-none"}>,&nbsp;</span>
                        <span className={profile["smoker"]?"":"d-none"}>Likes to smoke</span>
                        <span className={profile["smoker"]&&profile["relationship"]?"":"d-none"}>,&nbsp;</span>
                        <span className={profile["relationship"]?"":"d-none"}>In a relationship</span>
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