//TODO make changes with api

import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getProfileByUsername, updateProfile } from "../../../api";
import { CheckBoxField, SelectField, TextField, TextAreaField } from "../../common";

export const ProfileEditor = () => {
    const [ profile, setProfile ] = useState(null);
    
    const lifestylePreferences = [];
    const propertyPreferences = [];

    const params = useParams();

    //TODO update for on click
    useEffect(() => {
        getProfileByUsername(params.username).then(x => setProfile(x));
    }, []);

    const mergeProfile = delta => setProfile({ ...profile, ...delta });

    const addLifestyle = pref => {
        lifestylePreferences.push(pref);
    }

    const addProperty = pref => {
        propertyPreferences.push(pref);
    }

    const loadInfo = () => {
        profile.name = profile[0].name;
        profile.location = profile[0].city;
        profile.age = profile[0].age;
        profile.gender = profile[0].gender;
        profile.bio = profile[0].bio;
        profile.desiredRoomates = profile[0].desiredRoomates;
    }


    const saveChanges = () => {
        profile[0].name = profile.name;
        profile[0].city = profile.location;
        profile[0].age = profile.age;
        profile[0].gender = profile.gender;
        profile[0].bio = profile.bio;
        profile[0].desiredRoomates = profile.desiredRoomates;

        //Add lifestyle and property preferences

        updateProfile(profile[0]);
    }


    if(!profile) {
        return <>Error loading profile...</>;
    }

    return <>
        {loadInfo()}
        <div className="container py-4">
            <div className="bg-light rounded p-5 pb-4 mb-4">
                <h1>Profile Editor</h1>
                <TextField label="Name"
                            id="name"
                            value={profile.name}
                            setValue={name => mergeProfile({ name }) } />
                <TextField label="Location"
                            id="location"
                            value={profile.location}
                            setValue={ location => mergeProfile({ location }) } />
                <SelectField label="Gender"
                            value={profile.gender}
                            setValue={ gender => mergeProfile({ gender }) }
                            options={["Male", "Female", "Other"]} />
                <div className="col-1">
                    <SelectField label="Age"
                                value={profile.age}
                                setValue={ age => mergeProfile({ age }) }
                                options={[...Array(85 - 18 + 1).keys()].map(x => x + 18)}/>
                </div>
                <TextAreaField label="About me"
                                value={profile.bio}
                                setValue={bio => mergeProfile({ bio })} />
                <div className="col-3">
                    <SelectField label="How many roommates do you need?"
                                value={profile.desiredRoomates}
                                setValue={ desiredRoomates => mergeProfile({ desiredRoomates }) }
                                options={[...Array(10).keys()].map(x => x + 1)}/>
                </div>
                <CheckBoxField label="Check this box if you have a residence."
                        checked={profile.hasResidence}
                        setChecked={ hasResidence => mergeProfile({ hasResidence }) } />
                <div>
                    <p className="mt-3 mb-0 fw-bold">Select your lifestyle references below.</p>
                    <CheckBoxField label="Night-owl"
                        checked={profile.nightOwl}
                        setChecked={ nightOwl => {addLifestyle({ nightOwl }); mergeProfile({lifestylePreferences}) }} />
                    <CheckBoxField label="Early-bird"
                        checked={profile.earlyBird}
                        setChecked={ earlyBird => {addLifestyle({ earlyBird }); mergeProfile({lifestylePreferences}) }} />
                    <CheckBoxField label="Smoke-free"
                        checked={profile.smokeFree}
                        setChecked={ smokeFree => {addLifestyle({ smokeFree }); mergeProfile({lifestylePreferences}) }} />
                    <CheckBoxField label="Pet-friendly"
                        checked={profile.petFriendly}
                        setChecked={ petFriendly => {addLifestyle({ petFriendly }); mergeProfile({lifestylePreferences}) }} />
                </div>
                <div>
                    <p className="mt-3 mb-0 fw-bold">Select your property references below.</p>
                    <CheckBoxField label="House"
                        checked={profile.house}
                        setChecked={ house => {addProperty({ house }); mergeProfile({propertyPreferences}) }} />
                    <CheckBoxField label="Apartment"
                        checked={profile.apartment}
                        setChecked={ apartment => {addProperty({ apartment }); mergeProfile({propertyPreferences}) }} />
                    <CheckBoxField label="Condo"
                        checked={profile.condo}
                        setChecked={ condo => {addProperty({ condo }); mergeProfile({propertyPreferences}) }} />
                </div>
           
                <Link to={ `/dashboard/${profile[0].email}` }>
                    <button type="button" className="btn btn-primary btn-lg col-12 mt-3" onClick={() => saveChanges()}>
                        Save Changes
                    </button>
                </Link>
            </div>
        </div>
    </>;
};