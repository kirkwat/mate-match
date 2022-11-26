//TODO make preference changes with api
//TODO make necessary fields mandatory, make max char input for field

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProfileByUsername, updateProfile } from "../../../api";
import { useAuth } from "../../../hooks";
import { CheckBoxField, SelectField, TextField, TextAreaField } from "../../common";
import { Gender } from "../../../models";

export const ProfileEditor = () => {
    const { auth } = useAuth();

    const [ profile, setProfile ] = useState(undefined);
    const [ preferences, setPreferences ] = useState(undefined);

    const genders = [
        new Gender("male", "Man"),
        new Gender("female", "Woman"),
    ]
    
    //DELETE - this is just an example until api is working
    const prefs = {
        apartment: true,
        house: true,
        condo: true,

        nightPerson: true,
        morningPerson: true,
        shareFood: true,
        pets: true,

        extrovert: true,
        introvert: true,
        bringFriendsOver: true,

        loud: true,
        messy: true,
        smoker: true,
    };

    useEffect(() => {
        getProfileByUsername(auth).then(x => setProfile(x[0]));
        //TODO get preferences
        setPreferences(prefs);
    }, []);

    const mergeProfile = delta => setProfile({ ...profile, ...delta });
    const mergePreferences = delta => setPreferences({ ...preferences, ...delta });

    const handleSaveClick = () => {
        updateProfile(profile, auth);
        //TODO save preferences
    }

    if(!profile) {
        return <>
            <div className="container py-4">
                <div className="bg-light rounded p-5 pb-4 mb-4">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading Profile...</span>
                    </div>
                    <span className="fs-2 fw-bold">&nbsp;Loading Profile...</span>
                </div>
            </div>
        </>;
    }

    return <>
        <div className="container py-4">
            <div className="bg-light rounded p-5 pb-4 mb-4">
                <h1>Create/Edit Your Profile</h1>
                <TextField label="Name"
                            id="name"
                            value={profile.name}
                            setValue={name => mergeProfile({ name }) } />
                <TextField label="Profile Image Link (use Imgur, etc)"
                            id="photo"
                            value={profile.photoID}
                            setValue={photoID => mergeProfile({ photoID }) } />
                <TextField label="Location/City"
                            id="city"
                            value={profile.city}
                            setValue={ city => mergeProfile({ city }) } />
                <SelectField label="Gender"
                            value={profile.desired_gender}
                            setValue={ desired_gender => mergeProfile({ desired_gender }) }
                            options={genders}
                            optionValueKey="id"
                            optionLabelKey="withCaps"/>
                <div className="col-1">
                    <SelectField label="Age"
                                value={profile.age}
                                setValue={ age => mergeProfile({ age }) }
                                options={[...Array(85 - 18 + 1).keys()].map(x => x + 18)}/>
                </div>
                <TextAreaField label="About me"
                                value={profile.bio}
                                setValue={bio => mergeProfile({ bio })} />
                <div className="col-4">
                    <SelectField label="How many roommates do you need?"
                                value={profile.desired_roommates}
                                setValue={ desired_roommates => mergeProfile({ desired_roommates }) }
                                options={[...Array(9).keys()].map(x => x + 1)}/>
                </div>
                {/*
                <CheckBoxField label="Check this box if you have a residence."
                            checked={profile.hasResidence}
                            setChecked={ hasResidence => mergeProfile({ hasResidence }) } /> 
                */}
                <div>
                    <p className="mt-3 mb-0 fw-bold">Select your property references.</p>
                    <CheckBoxField label="Apartment"
                        checked={preferences.apartment}
                        setChecked={ apartment => mergePreferences({ apartment }) } />
                    <CheckBoxField label="House"
                        checked={preferences.house}
                        setChecked={ house => mergePreferences({ house }) } />
                    <CheckBoxField label="Condo"
                        checked={preferences.condo}
                        setChecked={ condo => mergePreferences({ condo }) } />
                </div>
                <div>
                    <p className="mt-3 mb-0 fw-bold">Select your lifestyle references.</p>
                    <CheckBoxField label="Night-owl"
                        checked={preferences.nightPerson}
                        setChecked={ nightPerson => mergePreferences({ nightPerson }) } />
                    <CheckBoxField label="Early-bird"
                        checked={preferences.morningPerson}
                        setChecked={ morningPerson => mergePreferences({ morningPerson }) } />
                    <CheckBoxField label="Pet-friendly"
                        checked={preferences.pets}
                        setChecked={ pets => mergePreferences({ pets }) } />
                    <CheckBoxField label="Likes to share food"
                        checked={preferences.shareFood}
                        setChecked={ shareFood => mergePreferences({ shareFood }) } />
                </div>
                <div>
                    <p className="mt-3 mb-0 fw-bold">Select what your potential roommates should know about you.</p>
                    <CheckBoxField label="Loud"
                        checked={preferences.loud}
                        setChecked={ loud => mergePreferences({ loud }) } />
                    <CheckBoxField label="Messy"
                        checked={preferences.messy}
                        setChecked={ messy => mergePreferences({ messy }) } />
                    <CheckBoxField label="I smoke"
                        checked={preferences.smoker}
                        setChecked={ smoker => mergePreferences({ smoker }) } />
                </div>
                <Link to={ `/profile` } 
                    className="btn btn-primary btn-lg col-12 mt-3"
                    onClick={ handleSaveClick }>
                    Save Changes
                </Link>
            </div>
        </div>
    </>;
};