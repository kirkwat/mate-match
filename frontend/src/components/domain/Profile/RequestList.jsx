import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getRequestsForRecipient, getRequestsForSender, deleteRequest, addRoommate } from "../../../api";
import { useAuth } from "../../../hooks";

export const RequestList = () => {
    const { auth } = useAuth();

    const [ receivedRequests, setReceivedRequests ] = useState([]);
    const [ sentRequests, setSentRequests ] = useState([]);
    const [ toOrFrom, setToOrFrom ] = useState(false);
    const [ sender, setSender ] = useState(undefined);
    const [ recipient, setRecipient ] = useState(undefined);

    useEffect(() => {
        getRequestsForRecipient(auth).then(x => setReceivedRequests(x));
        getRequestsForSender(auth).then(x => setSentRequests(x));
    }, []);

    useEffect(() => {
        if(sender){
            if(sender.status===0){
                deleteRequest(auth.username,sender.sender,auth).then(() => {
                    setReceivedRequests(receivedRequests.filter(x => x.from !== sender.sender));
                });
            }
            else if(sender.status===1){
                deleteRequest(auth.username,sender.sender,auth).then(
                    setReceivedRequests(receivedRequests.filter(x => x.from !== sender.sender))
                );
                addRoommate({person1:sender.sender,person2:auth.username},auth);
            }
        }
    }, [sender]);

    useEffect(() => {
        if(recipient){
            deleteRequest(recipient,auth.username,auth).then(() => {
                setSentRequests(sentRequests.filter(x => x.to !== recipient));
            });
        }
    }, [recipient]);

    return <>
        <div className="container pt-4 pb-5">
            <div className="bg-light rounded p-3 p-md-5 pb-4 mb-4">
                <h1>Roommate Requests</h1>
                <ul className="nav nav-tabs mb-3">
                    <li className="nav-item">
                        <button className={toOrFrom?"nav-link text-secondary":"nav-link active text-black"}
                                onClick={()=> {setToOrFrom(false)}}>
                            Received&nbsp;
                            <span>({receivedRequests.length})</span>
                        </button>
                    </li>
                    <li className="nav-item">
                        <button className={toOrFrom?"nav-link active text-black":"nav-link text-secondary"}
                                onClick={()=> {setToOrFrom(true)}}>
                            Sent&nbsp;
                            <span>({sentRequests.length})</span>
                        </button>
                    </li>
                </ul>
                {!toOrFrom?
                    (receivedRequests.length === 0 ? (
                        <p className="card mt-4 p-3 border-opacity-50">
                            Your roommate requests from other users will appear here.
                        </p>
                    ) : (
                        <ul className="list-group mt-4">
                            {receivedRequests && receivedRequests.map((request, index) =>
                                <div key={index} className="card mb-3">
                                    <div className="card-header fs-4">
                                        {request.name}&nbsp;
                                        <span className="fs-5">
                                            {request.gender === "male"?"(He/Him)":"(She/Her)"}
                                        </span>
                                        <Link to={ `/${request.from}/profile` }
                                            className="btn btn-primary btn-sm float-sm-end">
                                            View Profile
                                        </Link>
                                    </div>
                                    <div className="card-body">
                                        <p className="card-text text-secondary float-end">
                                            {request.city} - {request.age}
                                        </p>
                                        <p className="card-text col-10">{request.bio}</p>
                                        <div className="btn-group">
                                            <button type="button" 
                                                className="btn btn-danger"
                                                onClick= {()=> setSender({sender:request.from,status:0})}>
                                                Decline
                                            </button>
                                            <button type="button" 
                                                className="btn btn-success"
                                                onClick= {()=> setSender({sender:request.from,status:1})}>
                                                Approve
                                            </button>
                                        </div>
                                    </div>
                            </div>)}
                        </ul>
                    )
                ):(sentRequests.length === 0 ? (
                        <p className="card mt-4 p-3 border-opacity-50">
                            Roommate requests that you send to other users will appear here.
                        </p>
                    ) : (
                        <ul className="list-group mt-4">
                            {sentRequests && sentRequests.map((request, index) =>
                            <div key={index} className="card mb-3">
                                <div className="card-header fs-4">
                                    {request.name}&nbsp;
                                    <span className="fs-5">
                                        {request.gender === "male"?"(He/Him)":"(She/Her)"}
                                    </span>
                                    <Link to={ `/${request.to}/profile` }
                                        className="btn btn-primary btn-sm float-sm-end">
                                        View Profile
                                    </Link>
                                </div>
                                <div className="card-body">
                                    <p className="card-text text-secondary float-end">
                                        {request.city} - {request.age}
                                    </p>
                                    <p className="card-text col-10">{request.bio}</p>
                                    <button type="button" className="btn btn-outline-danger"
                                        onClick= {()=> setRecipient(request.to)}>
                                        Delete Request
                                    </button>
                                </div>
                            </div>)}
                        </ul>
                    ))
                }
            </div>
        </div>
    </>
};