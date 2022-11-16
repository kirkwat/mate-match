//TODO update styling
export const RequestList = ({ requests, standalone=false }) => {
    return <> 
        <div className={standalone?"container py-4":""}>
            <h3>Requests
                    <span className="text-secondary"> ({requests.length})</span>
            </h3>
            {requests.length === 0 ? (
                <p className="bg-light rounded p-3">Your roommate requests from other users will appear here.</p>
            ) : (
                <ul className="list-group">
                    {
                        requests.map((roommate, index) =>
                            <div key={index} className="card mb-3">
                                <div className="card-header fs-4">
                                    {roommate.name}
                                    <span className="fs-5"> {roommate.gender === "male"?"(He/Him)":"(She/Her)"}</span>
                                </div>
                                <div className="card-body">
                                    <p className="card-text text-secondary float-end">
                                        {roommate.city} - {roommate.age}
                                    </p>
                                    <p className="card-text col-10">{roommate.paragraph}</p>
                                </div>
                            </div>
                        )
                    }
                </ul>
            )}
        </div>
    </>
};