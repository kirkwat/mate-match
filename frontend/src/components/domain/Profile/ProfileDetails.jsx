import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { useAuth, useAxiosPrivate } from "../../../hooks";
import { RoommateList } from "./RoommateList";

export const ProfileDetails = () => {
  const { auth } = useAuth();
  const params = useParams();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const [profile, setProfile] = useState(undefined);
  const [roommate, setRoommate] = useState(false);
  const [sentRequest, setSentRequest] = useState(undefined);
  const [receivedRequest, setReceivedRequest] = useState(undefined);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await axiosPrivate.get(
          `/user?email=${params.username ? params.username : auth.username}`
        );
        setProfile(response.data[0]);
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };
    const checkRequest = async (to, from) => {
      try {
        const response = await axiosPrivate.get(
          `/request/?to=${to}&from=${from}`
        );
        return response.data;
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };
    const getRoommates = async () => {
      try {
        const response = await axiosPrivate.get(
          `/roommate?email=${auth.username}`
        );
        return response.data;
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };
    getProfile();
    if (params.username) {
      getRoommates().then((x) =>
        setRoommate(
          x.filter((user) => user.email === params.username).length !== 0
        )
      );
      checkRequest(params.username, auth.username).then((x) =>
        setSentRequest(x[0])
      );
      checkRequest(auth.username, params.username).then((x) =>
        setReceivedRequest(x[0])
      );
    }
  }, [params]);

  const handleSendRequest = () => {
    const sendRequest = async () => {
      try {
        const response = await axiosPrivate.post(`/request`, {
          to: params.username,
          from: auth.username,
        });
        return response.data;
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };
    sendRequest();
    navigate(`/requests`);
  };

  if (!profile) {
    return (
      <>
        <div className="container pt-4 pb-5 mb-4">
          <div className="bg-light rounded p-3 p-md-5 pb-md-4 mb-4">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading Profile...</span>
            </div>
            <span className="fs-2 fw-bold">&nbsp;Loading Profile...</span>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container pt-4 pb-5 mb-4">
        <div className="bg-light rounded p-3 p-md-5 pb-md-4 mb-3">
          <div className="avatar-image float-sm-end mb-2">
            <img
              src={profile.photoID ? profile.photoID : "/images/default.jpg"}
              alt="avatar"
              className="img-fluid"
            />
          </div>
          <h1 className="display-5 text-center text-sm-start">
            <span className="fw-bold">{profile.name}</span>
            <span className="fs-1">
              &nbsp;
              {profile.gender === "male" ? "(He/Him)" : "(She/Her)"}
            </span>
          </h1>
          <h3 className="display-7 text-center text-sm-start">
            <span>{profile.city}</span>
            <span> - {profile.age}</span>
          </h3>
          <p className="fs-5 col-md-8 text-center text-sm-start">
            {profile.bio}
          </p>
          <ul className="list-group list-group-flush">
            <li className="list-group-item bg-light"></li>
            <li className="list-group-item bg-light">
              {profile.hasResidence
                ? "I currently have housing."
                : "I currently don't have housing."}
            </li>
            <li className="list-group-item bg-light">
              <span className="fw-bold">Roommates needed:&nbsp;</span>
              {profile.desired_roommates}
            </li>
            <li className="list-group-item bg-light">
              <span className="fw-bold">Property Preferences:&nbsp;</span>
              <span className={profile.apartment ? "" : "d-none"}>
                Apartment
              </span>
              <span
                className={
                  profile.apartment && (profile.house || profile.condo)
                    ? ""
                    : "d-none"
                }
              >
                ,&nbsp;
              </span>
              <span className={profile.house ? "" : "d-none"}>House</span>
              <span className={profile.house && profile.condo ? "" : "d-none"}>
                ,&nbsp;
              </span>
              <span className={profile.condo ? "" : "d-none"}>Condo</span>
            </li>
            <li className="list-group-item bg-light">
              <span className="fw-bold">Lifestyle Preferences:&nbsp;</span>
              <span className={profile.nightPerson ? "" : "d-none"}>
                Night-owl
              </span>
              <span
                className={
                  profile.nightPerson &&
                  (profile.morningPerson || profile.shareFood || profile.pets)
                    ? ""
                    : "d-none"
                }
              >
                ,&nbsp;
              </span>
              <span className={profile.morningPerson ? "" : "d-none"}>
                Early-bird
              </span>
              <span
                className={
                  profile.morningPerson && (profile.shareFood || profile.pets)
                    ? ""
                    : "d-none"
                }
              >
                ,&nbsp;
              </span>
              <span className={profile.pets ? "" : "d-none"}>Pet-friendly</span>
              <span
                className={profile.pets && profile.shareFood ? "" : "d-none"}
              >
                ,&nbsp;
              </span>
              <span className={profile.shareFood ? "" : "d-none"}>
                Likes to share food
              </span>
            </li>
            <li className="list-group-item bg-light">
              <span className="fw-bold">Personality:&nbsp;</span>
              <span className={profile.extrovert ? "" : "d-none"}>
                Extrovert
              </span>
              <span
                className={
                  profile.extrovert &&
                  (profile.introvert || profile.bringFriendsOver)
                    ? ""
                    : "d-none"
                }
              >
                ,&nbsp;
              </span>
              <span className={profile.introvert ? "" : "d-none"}>
                Introvert
              </span>
              <span
                className={
                  profile.introvert && profile.bringFriendsOver ? "" : "d-none"
                }
              >
                ,&nbsp;
              </span>
              <span className={profile.bringFriendsOver ? "" : "d-none"}>
                Likes to bring friends over
              </span>
            </li>
            <li className="list-group-item bg-light">
              <span className="fw-bold">Important to Know:&nbsp;</span>
              <span className={profile.loud ? "" : "d-none"}>Loud</span>
              <span
                className={
                  profile.loud &&
                  (profile.messy || profile.smoker || profile.relationship)
                    ? ""
                    : "d-none"
                }
              >
                ,&nbsp;
              </span>
              <span className={profile.messy ? "" : "d-none"}>Messy</span>
              <span
                className={
                  profile.messy && (profile.smoker || profile.relationship)
                    ? ""
                    : "d-none"
                }
              >
                ,&nbsp;
              </span>
              <span className={profile.smoker ? "" : "d-none"}>
                Likes to smoke
              </span>
              <span
                className={
                  profile.smoker && profile.relationship ? "" : "d-none"
                }
              >
                ,&nbsp;
              </span>
              <span className={profile.relationship ? "" : "d-none"}>
                In a relationship
              </span>
            </li>
            <li className="list-group-item bg-light"></li>
          </ul>
          {!params.username ? (
            <Link to={`edit`} className="btn btn-primary btn-lg col-12 mt-3">
              Edit Profile
            </Link>
          ) : sentRequest ? (
            <button
              type="button"
              className="btn btn-primary btn-lg col-12 mt-3"
              disabled={true}
              onClick={handleSendRequest}
            >
              Roommate Request Sent!
            </button>
          ) : receivedRequest ? (
            <button
              type="button"
              className="btn btn-primary btn-lg col-12 mt-3"
              disabled={true}
              onClick={handleSendRequest}
            >
              You have a request from this user!
            </button>
          ) : (
            <button
              type="button"
              className={
                roommate ? "d-none" : "btn btn-primary btn-lg col-12 mt-3"
              }
              onClick={handleSendRequest}
            >
              Send Roommate Request
            </button>
          )}
        </div>
        <RoommateList username={params.username ? params.username : false} />
      </div>
    </>
  );
};
