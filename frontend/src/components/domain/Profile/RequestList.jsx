//TODO make getrequests that get profile to show details for each request

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getRequestsForUser, deleteRequest, addRoommate } from "../../../api";
import { useAuth } from "../../../hooks";

export const RequestList = () => {
    const { auth } = useAuth();
    const navigate = useNavigate()

    const [ requests, setRequests ] = useState([]);

    useEffect(() => {
        getRequestsForUser(auth).then(x => setRequests(x));
    }, []);

    const handleAcceptRequest = (sender) => {
        console.log("hello");
        deleteRequest({from:sender,to:auth.username},auth);
        addRoommate({person1:sender,person2:auth.username},auth);
        navigate(`/roommates`);

        //delete request 
        //add roommate
        //redirect to roommates
        //sendRequest({to:params.username,from:auth.username},auth);
        //navigate(`/requests`);
    };

    const handleDeclineRequest = (sender) => {
        console.log("bye");
        //sendRequest({to:params.username,from:auth.username},auth);
        //navigate(`/requests`);
    };


    return <> 
        <div className={"container py-4"}>
            <h3>Requests
                    <span className="text-secondary"> ({requests.length})</span>
            </h3>
            {requests.length === 0 ? (
                <p className="bg-light rounded p-3">
                    
                    {/* DELETE */}
                    <Link to={ `/deuce/profile` }>
                        <button type ="button" className="btn btn-primary btn-sm float-end">
                            View Profile
                        </button>
                    </Link>
                    
                    
                    Your roommate requests from other users will appear here.</p>
            ) : (
                <ul className="list-group">
                    {
                        requests && requests.map((request, index) =>
                            <div key={index} className="card mb-3">
                                <div className="card-header fs-4">
                                    {request.from}
                                    <span className="fs-5">
                                        {request.desired_gender === "male"?"(He/Him)":"(She/Her)"}
                                    </span>
                                    <Link to={ `/${request.from}/profile` }
                                        className="btn btn-primary btn-sm float-end">
                                        View Profile
                                    </Link>
                                </div>
                                <div className="card-body">
                                    <p className="card-text text-secondary float-end">
                                        {request.city} - {request.age}
                                    </p>
                                    <p className="card-text col-10">{request.message}</p>
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-danger"
                                            onClick= {handleDeclineRequest}>
                                            Decline
                                        </button>
                                        <button type="button" className="btn btn-success"
                                            onClick= {handleAcceptRequest(request.from)}>
                                            Approve
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </ul>
            )}
        </div>
    </>
};