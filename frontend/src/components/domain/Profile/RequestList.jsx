//TODO get roommates page to show updated roommates list
//TODO make getrequests that get profile to show details for each request

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getRequestsForUser, deleteRequest, addRoommate } from "../../../api";
import { useAuth } from "../../../hooks";

export const RequestList = () => {
    const { auth } = useAuth();
    const navigate = useNavigate()

    const [ requests, setRequests ] = useState([]);
    const [ sender, setSender ] = useState(undefined);

    useEffect(() => {
        getRequestsForUser(auth).then(x => setRequests(x));
    }, []);

    useEffect(() => {
        if(sender){
            //decline request
            if(sender.status===0){
                deleteRequest(auth.username,sender.sender,auth).then(() => {
                    setRequests(requests.filter(x => x.from !== sender.sender));
                });
            }
            //approve request
            else if(sender.status===1){
                deleteRequest(auth.username,sender.sender,auth).then(
                    setRequests()
                );
                addRoommate({person1:sender.sender,person2:auth.username},auth);
                //TODO get roommates page to show updated roommates list
                navigate(`/roommates`);
            }
        }
    }, [sender]);

    return <> 
        <div className={"container py-4"}>
            <h3>Requests
                    <span className="text-secondary"> ({requests.length})</span>
            </h3>
            {requests.length === 0 ? (
                <p className="bg-light rounded p-3">
                    Your roommate requests from other users will appear here.
                </p>
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
                                            onClick= {()=> setSender({sender:request.from,status:0})}>
                                            Decline
                                        </button>
                                        <button type="button" className="btn btn-success"
                                            onClick= {()=> setSender({sender:request.from,status:1})}>
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