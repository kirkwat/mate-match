import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth, useAxiosPrivate } from "../../../hooks";
import {
  CheckBoxField,
  SelectField,
  TextField,
  TextAreaField,
} from "../../common";
import { Gender } from "../../../models";

export const ProfileEditor = () => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const [profile, setProfile] = useState(undefined);

  const [nameReq, setNameReq] = useState(false);
  const [cityReq, setCityReq] = useState(false);

  const genders = [new Gender("male", "Man"), new Gender("female", "Woman")];

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await axiosPrivate.get(`/user?email=${auth.username}`);
        setProfile(response.data[0]);
        return response.data[0];
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };
    getProfile().then((x) => {
      if (x?.name) setNameReq(true);
      if (x?.city) setCityReq(true);
    });
  }, []);

  const mergeProfile = (delta) => {
    setProfile({ ...profile, ...delta });
    if (delta["name"] !== undefined) {
      checkLength(delta["name"], "name");
    }

    if (delta["city"] !== undefined) {
      checkLength(delta["city"], "city");
    }
    checkReq();
  };

  const checkLength = (delta, type) => {
    if (delta.length > 0 && type === "name") {
      setNameReq(true);
    } else if (delta.length === 0 && type === "name") {
      setNameReq(false);
    } else if (delta.length > 0 && type === "city") {
      setCityReq(true);
    } else {
      setCityReq(false);
    }
  };

  const checkReq = () => {
    if (!nameReq || !cityReq) {
      return false;
    }
    return true;
  };

  const handleSaveClick = async () => {
    const updateProfile = async (profile) => {
      try {
        await axiosPrivate.put(`/user`, profile);
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };
    const updatePreferences = async (preferences) => {
      try {
        await axiosPrivate.put(`/user/preferences`, preferences);
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };
    await updateProfile({
      email: profile.email,
      photoID: profile.photoID,
      name: profile.name,
      age: profile.age,
      city: profile.city,
      bio: profile.bio,
      gender: profile.gender,
      hasResidence: profile.hasResidence,
      desired_roommates: profile.desired_roommates,
    });
    await updatePreferences({
      email: profile.email,
      apartment: profile.apartment,
      house: profile.house,
      condo: profile.condo,
      nightPerson: profile.nightPerson,
      morningPerson: profile.morningPerson,
      extrovert: profile.extrovert,
      introvert: profile.introvert,
      smoker: profile.smoker,
      bringFriendsOver: profile.bringFriendsOver,
      loud: profile.loud,
      shareFood: profile.shareFood,
      messy: profile.messy,
      pets: profile.pets,
      relationship: profile.relationship,
    });
    navigate("/profile", { state: { from: location }, replace: true });
  };

  if (!profile) {
    return (
      <>
        <div className="container pt-4 pb-5 mb-4">
          <div className="bg-light rounded p-5 pb-4 mb-4">
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
        <div className="bg-light rounded p-3 p-md-5 pb-md-4 mb-4">
          <h1>Create/Edit Your Profile</h1>
          <h4>Username:&nbsp;({profile.email})</h4>
          <div className="col-md-4">
            <TextField
              label="Name"
              id="name"
              value={profile.name}
              required={true}
              setValue={(name) => {
                mergeProfile({ name });
              }}
            />
          </div>
          <div className="col-md-4">
            <TextField
              label="Location/City"
              id="city"
              value={profile.city}
              required={true}
              setValue={(city) => {
                mergeProfile({ city });
              }}
            />
          </div>
          <div className="col-3 col-sm-2">
            <SelectField
              label="Gender"
              value={profile.gender}
              setValue={(gender) => mergeProfile({ gender })}
              options={genders}
              optionValueKey="id"
              optionLabelKey="display"
            />
          </div>
          <div className="col-2 col-md-1">
            <SelectField
              label="Age"
              value={profile.age}
              setValue={(age) => mergeProfile({ age })}
              options={[...Array(85 - 18 + 1).keys()].map((x) => x + 18)}
            />
          </div>
          <TextAreaField
            label="Profile Image Link (use Imgur, etc)"
            id="photo"
            value={profile.photoID}
            rowNum={1}
            setValue={(photoID) => mergeProfile({ photoID })}
          />
          <TextAreaField
            label="About me"
            value={profile.bio}
            setValue={(bio) => mergeProfile({ bio })}
            rowNum={4}
          />
          <div className="col-6 col-md-4">
            <SelectField
              label="How many roommates do you need?"
              value={profile.desired_roommates}
              setValue={(desired_roommates) =>
                mergeProfile({ desired_roommates })
              }
              options={[...Array(9).keys()].map((x) => x + 1)}
            />
          </div>
          <CheckBoxField
            label="Check this box if you have a residence."
            checked={profile.hasResidence}
            setChecked={(hasResidence) => mergeProfile({ hasResidence })}
          />
          <div>
            <p className="mt-3 mb-0 fw-bold">
              Select your property references.
            </p>
            <CheckBoxField
              label="Apartment"
              checked={profile.apartment}
              setChecked={(apartment) => mergeProfile({ apartment })}
            />
            <CheckBoxField
              label="House"
              checked={profile.house}
              setChecked={(house) => mergeProfile({ house })}
            />
            <CheckBoxField
              label="Condo"
              checked={profile.condo}
              setChecked={(condo) => mergeProfile({ condo })}
            />
          </div>
          <div>
            <p className="mt-3 mb-0 fw-bold">
              Select your lifestyle references.
            </p>
            <CheckBoxField
              label="Night-owl"
              checked={profile.nightPerson}
              setChecked={(nightPerson) => mergeProfile({ nightPerson })}
            />
            <CheckBoxField
              label="Early-bird"
              checked={profile.morningPerson}
              setChecked={(morningPerson) => mergeProfile({ morningPerson })}
            />
            <CheckBoxField
              label="Pet-friendly"
              checked={profile.pets}
              setChecked={(pets) => mergeProfile({ pets })}
            />
            <CheckBoxField
              label="Likes to share food"
              checked={profile.shareFood}
              setChecked={(shareFood) => mergeProfile({ shareFood })}
            />
          </div>
          <div>
            <p className="mt-3 mb-0 fw-bold">
              Select traits that describe you.
            </p>
            <CheckBoxField
              label="Extrovert"
              checked={profile.extrovert}
              setChecked={(extrovert) => mergeProfile({ extrovert })}
            />
            <CheckBoxField
              label="Introvert"
              checked={profile.introvert}
              setChecked={(introvert) => mergeProfile({ introvert })}
            />
            <CheckBoxField
              label="I like to bring friends over"
              checked={profile.bringFriendsOver}
              setChecked={(bringFriendsOver) =>
                mergeProfile({ bringFriendsOver })
              }
            />
          </div>
          <div>
            <p className="mt-3 mb-0 fw-bold">
              Select what your potential roommates should know about you.
            </p>
            <CheckBoxField
              label="Loud"
              checked={profile.loud}
              setChecked={(loud) => mergeProfile({ loud })}
            />
            <CheckBoxField
              label="Messy"
              checked={profile.messy}
              setChecked={(messy) => mergeProfile({ messy })}
            />
            <CheckBoxField
              label="I smoke"
              checked={profile.smoker}
              setChecked={(smoker) => mergeProfile({ smoker })}
            />
            <CheckBoxField
              label="I am in a relationship"
              checked={profile.relationship}
              setChecked={(relationship) => mergeProfile({ relationship })}
            />
          </div>
          {checkReq() && (
            <button
              className="btn btn-primary btn-lg col-12 mt-3"
              onClick={handleSaveClick}
            >
              Save Changes
            </button>
          )}
          {!checkReq() && (
            <div className="card text-center text-bg-primary opacity-50 fs-5 col-12 mt-3 p-2">
              Save Changes
            </div>
          )}
        </div>
      </div>
    </>
  );
};
