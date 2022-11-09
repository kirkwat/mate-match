import { Profile } from "../../models/profile";

export const ProfileCards = ({profiles}) =>
<div className="profileCardContainer">
    {
    profiles.map((profile, index) =>
        <div className="card mt-4 pt-3 border border-2 border-dark" style={{width: "75%"}}>
            <div className="row">
                <div className="col-sm-3 ms-3" style={{marginRight: "-5%"}}>
                    <img className="img-thumbnail" src="https://via.placeholder.com/100" alt="Profile pic"/>
                </div>
                <div className="col-sm-2">
                    <p className="fs-2">{profile.name}</p>
                </div>
                <div className="col-sm-5 fs-5" style={{marginRight: "3%"}}>
                    <p>Location: {profile.location}</p>
                    <p>Gender: {profile.gender}</p>
                    <p>Age: {profile.age}</p>
                </div>
                <div className="col-sm-2">
                    <button type = "button" className="btn btn-primary">Report</button>
                </div>


            </div>
        </div>
        )
    }

</div>;