//TODO make getrequests that get profile to show details for each request

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getRequests } from "../../../api";
import { useAuth } from "../../../hooks";

export const RequestList = () => {

    const { auth } = useAuth();

    const [ requests, setRequests ] = useState([]);

    useEffect(() => {
        getRequests(auth).then(x => setRequests(x));
    }, []);

    return <> 
        <div className={"container py-4"}>
            <h3>Requests
                    <span className="text-secondary"> ({requests.length})</span>
            </h3>
            {requests.length === 0 ? (
                <p className="bg-light rounded p-3">Your roommate requests from other users will appear here.</p>
            ) : (
                <ul className="list-group">
                    {
                        requests && requests.map((request, index) =>
                            <div key={index} className="card mb-3">
                                <div className="card-header fs-4">
                                    {request.from}
                                    <span className="fs-5"> {request.gender === "male"?"(He/Him)":"(She/Her)"}</span>
                                    <Link to={ `/${request.from}/profile` }>
                                        <button type ="button" className="btn btn-primary btn-sm float-end">View Profile</button>
                                    </Link>
                                </div>
                                <div className="card-body">
                                    <p className="card-text text-secondary float-end">
                                        {request.city} - {request.age}
                                    </p>
                                    <p className="card-text col-10">{request.message}</p>
                                    {/*update with api to accept or decline requests*/}
                                    <div className="btn-group">
                                        <a href="#" className="btn btn-danger">Decline</a>
                                        <a href="#" className="btn btn-success">Approve</a>
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