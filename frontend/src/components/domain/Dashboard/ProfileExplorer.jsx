import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth, useAxiosPrivate } from "../../../hooks";
import { ProfileSearch, ResultList } from "../Dashboard";

export const ProfileExplorer = () => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const [profiles, setProfiles] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/user");
        return response.data;
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };
    getUsers().then((x) => {
      setProfiles(
        x.filter((y) => y.email !== auth.username && y.name !== null)
      );
      setSearchResults(
        x.filter((y) => y.email !== auth.username && y.name !== null)
      );
    });
  }, []);

  return (
    <>
      <div className="container pt-4 pb-5 mb-4">
        <div className="bg-light rounded p-3 p-md-5 pb-4 mb-4">
          <ProfileSearch
            profiles={profiles}
            setSearchResults={setSearchResults}
          />
          <ResultList results={searchResults} />
        </div>
      </div>
    </>
  );
};
