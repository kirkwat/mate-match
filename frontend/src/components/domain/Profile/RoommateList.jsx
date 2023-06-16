import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth, useAxiosPrivate } from "../../../hooks";

export const RoommateList = ({ username = false, standalone = false }) => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const [roommates, setRoommates] = useState([]);

  useEffect(() => {
    const getRoommates = async () => {
      try {
        const response = await axiosPrivate.get(
          `/roommate?email=${username ? username : auth.username}`
        );
        setRoommates(response.data);
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };
    getRoommates();
  }, []);

  return (
    <>
      <div className={standalone ? "container pt-4 pb-5 mb-4" : "pb-2"}>
        <div
          className={
            standalone ? "bg-light rounded p-3 p-md-5 pb-md-4 mb-4" : ""
          }
        >
          <h1 className={standalone ? "fs-1 mb-4" : "fs-3"}>
            Roommates&nbsp;
            <span className="text-secondary">
              (
              {roommates.length === 0 ? roommates.length : roommates.length - 1}
              )
            </span>
          </h1>
          {roommates.length === 0 ? (
            <p
              className={
                standalone
                  ? "card mt-4 p-3 border-opacity-50"
                  : "bg-light rounded p-3"
              }
            >
              {username
                ? "This user currently has no roommates!"
                : "Send a request to become roommates!"}
            </p>
          ) : (
            <ul className="list-group">
              {roommates &&
                roommates
                  .filter(
                    (roommate) =>
                      roommate.email !== (username ? username : auth.username)
                  )
                  .map((roommate, index) => (
                    <div key={index} className="card mb-3">
                      <div className="card-header fs-4">
                        <img
                          src={
                            roommate.signedUrl
                              ? roommate.signedUrl
                              : "/images/default.jpg"
                          }
                          alt="Avatar"
                          className="rounded-circle me-2"
                          style={{ width: "32px", height: "32px" }}
                        />
                        {roommate.name}&nbsp;
                        <span className="fs-5 d-none d-sm-inline">
                          {roommate.gender === "male"
                            ? "(He/Him)"
                            : "(She/Her)"}
                        </span>
                        <Link
                          to={
                            roommate.email === auth.username
                              ? `/profile`
                              : `/${roommate.email}/profile`
                          }
                          className="btn btn-primary btn-sm float-end"
                        >
                          View Profile
                        </Link>
                      </div>
                      <div className="card-body">
                        <p className="card-text text-secondary float-end">
                          {roommate.city} - {roommate.age}
                        </p>
                        <p className="card-text col-10">
                          <span className="fw-bold">About:&nbsp;</span>
                          {roommate.bio}
                        </p>
                      </div>
                    </div>
                  ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};
