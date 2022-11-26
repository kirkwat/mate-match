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

    return <> 
        <div className={standalone?"container py-4":""}>
            <h3>Roommates
            </h3>
            {!roommates ? (
                <p className="bg-light rounded p-3">
                    {
                        username?"This user currently has no roommates!":"Send a request to become roommates!"
                    }
                </p>
            ) : (
                <ul className="list-group">
                    {
                        keys && keys.filter(x=>x!=='id').map((roommate, index) => (
                            roommates[roommate]===(username?username:auth.username)||!roommates[roommate]?<div key={index}/>:(
                                <div key={index} className="card mb-3">
                                    <div className="card-header fs-4">
                                        {roommates[roommate]}
                                        <span className="fs-5">
                                            {roommate.desired_gender === "male"?"(He/Him)":"(She/Her)"}
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