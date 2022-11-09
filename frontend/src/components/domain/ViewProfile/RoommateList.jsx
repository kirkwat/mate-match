//TODO update styling
export const RoommateList = ({ roommates }) => {

    if(roommates.length === 0) {
        return <>
            <h3>Roommates
                <span className="text-secondary"> ({roommates.length})</span>
            </h3>
            <p className="bg-light rounded p-3">Send a request to become roommates!</p>
        </>
    }

    const options = { year: 'numeric', month: 'short', day: 'numeric' };

    return <>
        <h3>Roommates
            <span className="text-secondary"> ({roommates.length})</span>
        </h3>
        <ul className="list-group">
            {
                roommates.map((roommate, index) =>
                    <div key={index} className="card mb-3">
                        <div className="card-header fs-4">
                            {roommate.name}
                            <span className="fs-5"> {roommate.gender}</span>
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
    </>;
};