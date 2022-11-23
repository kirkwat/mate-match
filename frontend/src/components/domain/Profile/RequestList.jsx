import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getRequests } from "../../../api";
import { useAuth } from "../../../hooks";

export const RequestList = () => {

    const { auth } = useAuth();

    const [ requests, setRequests ] = useState([]);

    useEffect(() => {
        getRequests(auth).then(x => setRequests(x));
        console.log(requests);
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
                        requests && requests.map((roommate, index) =>
                            <div key={index} className="card mb-3">
                                <div className="card-header fs-4">
                                    {roommate.name}
                                    <span className="fs-5"> {roommate.gender === "male"?"(He/Him)":"(She/Her)"}</span>
                                    <Link to={ `/profileDetail` }>
                                        <button type ="button" className="btn btn-primary btn-sm float-end">View Profile</button>
                                    </Link>
                                </div>
                                <div className="card-body">
                                    <p className="card-text text-secondary float-end">
                                        {roommate.city} - {roommate.age}
                                    </p>
                                    <p className="card-text col-10">{roommate.paragraph}</p>
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