//TODO get each user card to show their information

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks";
import { getRoommates, getProfileByUsername2 } from "../../../api";

export const RoommateList = ({ username=false, standalone=false }) => {
    const { auth } = useAuth();

    const [ roommates, setRoommates ] = useState(undefined);
    const [ keys, setKeys ] = useState([]); 

    useEffect(() => {
            getRoommates(username?username:auth.username,auth).then(x => {
                setRoommates(x[0]);
                setKeys(x[0]?Object.keys(x[0]):[]);
            });
    }, []);

    if(!roommates) {
        return <>
        <div className="container py-4">
            <div className="bg-light rounded p-5 pb-4 mb-4">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading Roommates...</span>
                </div>
                <span className="fs-2 fw-bold">&nbsp;Loading Roommates...</span>
            </div>
        </div>
    </>;
    }

    return <> 
        <div className={standalone?"container py-4":""}>
            <h3>Roommates
            </h3>
            {false ? (
                <p className="bg-light rounded p-3">Send a request to become roommates!</p>
            ) : (
                <ul className="list-group">
                    {
                        keys && keys.filter(x=>x!=='id').map((roommate, index) => (
                            roommates[roommate]===(username?username:auth.username)||!roommates[roommate]?<></>:(
                                <div key={index} className="card mb-3">
                                    <div className="card-header fs-4">
                                        {roommates[roommate]}
                                        <span className="fs-5">
                                            {roommate.gender === "male"?"(He/Him)":"(She/Her)"}
                                        </span>
                                        <Link to={ `/${roommates[roommate]}/profile` }>
                                            <button type ="button" className="btn btn-primary btn-sm float-end">
                                                View Profile
                                            </button>
                                        </Link>
                                    </div>
                                    <div className="card-body">
                                        <p className="card-text text-secondary float-end">
                                            {roommate.city} - {roommate.age}
                                        </p>
                                        <p className="card-text col-10">{roommate.paragraph}</p>
                                    </div>
                                </div>
                            )
                        ))
                    }
                </ul>
            )}
        </div>
    </>
};