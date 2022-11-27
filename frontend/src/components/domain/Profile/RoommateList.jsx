import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks";
import { getRoommates } from "../../../api";

export const RoommateList = ({ username=false, standalone=false }) => {
    const { auth } = useAuth();

    const [ roommates, setRoommates ] = useState([]);

    useEffect(() => {
            getRoommates(username?username:auth.username,auth).then(x => {
                setRoommates(x);
            });
    }, []);

    return <> 
        <div className={standalone?"container py-4":""}>
            <h3>Roommates
                    <span className="text-secondary"> ({roommates.length === 0?roommates.length:roommates.length-1})</span>
            </h3>
            {roommates.length === 0 ? (
                <p className="bg-light rounded p-3">
                    {
                        username?"This user currently has no roommates!":"Send a request to become roommates!"
                    }
                </p>
            ) : (
                <ul className="list-group">
                    {
                        roommates && roommates.filter(roommate=>roommate.email!==(username?username:auth.username))
                            .map((roommate, index) => (
                            <div key={index} className="card mb-3">
                                <div className="card-header fs-4">
                                    {roommate.name}&nbsp;
                                    <span className="fs-5">
                                        {roommate.gender === "male"?"(He/Him)":"(She/Her)"}
                                    </span>
                                    <Link to={ 
                                            roommate.email===auth.username?`/profile`:`/${roommate.email}/profile`
                                        }
                                        className="btn btn-primary btn-sm float-end">
                                        View Profile
                                    </Link>
                                </div>
                                <div className="card-body">
                                    <p className="card-text text-secondary float-end">
                                        {roommate.city} - {roommate.age}
                                    </p>
                                    <p className="card-text col-10">{roommate.bio}</p>
                                </div>
                            </div>
                        ))
                    }
                </ul>
            )}
        </div>
    </>
};