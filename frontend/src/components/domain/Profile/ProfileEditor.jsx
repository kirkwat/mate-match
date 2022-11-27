//TODO make necessary fields mandatory, make max char input for field

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProfileByUsername, updateProfile, updatePreferences } from "../../../api";
import { useAuth } from "../../../hooks";
import { CheckBoxField, SelectField, TextField, TextAreaField } from "../../common";
import { Gender } from "../../../models";

export const ProfileEditor = () => {
    const { auth } = useAuth();

    const [ profile, setProfile ] = useState(undefined);

    const genders = [
        new Gender("male", "Man"),
        new Gender("female", "Woman"),
    ]
    
    useEffect(() => {
        getProfileByUsername(auth).then(x => setProfile(x[0]));
    }, []);

    const mergeProfile = delta => setProfile({ ...profile, ...delta });

    const handleSaveClick = () => {
        updateProfile({
            email:profile.email,
            photoID:profile.photoID,
            name:profile.name,
            age:profile.age,
            city:profile.city,
            bio:profile.bio,
            gender:profile.gender,
            hasResidence:profile.hasResidence,
            desired_roommates:profile.desired_roommates
        }, auth);

        updatePreferences({
            email:profile.email,
            apartment:profile.apartment,
            house:profile.house,
            condo:profile.condo,
            nightPerson:profile.nightPerson,
            morningPerson:profile.morningPerson,
            extrovert:profile.extrovert,
            introvert:profile.introvert,
            smoker:profile.smoker,
            bringFriendsOver:profile.bringFriendsOver,
            loud:profile.loud,
            shareFood:profile.shareFood,
            messy:profile.messy,
            pets:profile.pets,
            relationship:profile.relationship,
        }, auth);
    };

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
    };

    return <>
        <div className="container py-4">
            <div className="bg-light rounded p-5 pb-4 mb-4">
                <h1>Create/Edit Your Profile</h1>
                <h4>Username:&nbsp;({profile.email})</h4>
                <TextField label="Name"
                            id="name"
                            value={profile.name}
                            setValue={name => mergeProfile({ name }) } />
                <TextAreaField label="Profile Image Link (use Imgur, etc)"
                            id="photo"
                            value={profile.photoID}
                            max = "100"
                            rows= "0"
                            setValue={photoID => mergeProfile({ photoID }) } />
                <TextField label="Location/City"
                            id="city"
                            value={profile.city}
                            setValue={ city => mergeProfile({ city }) } />
                <SelectField label="Gender"
                            value={profile.gender}
                            setValue={ gender => mergeProfile({ gender }) }
                            options={genders}
                            optionValueKey="id"
                            optionLabelKey="display"/>
                <div className="col-1">
                    <SelectField label="Age"
                                value={profile.age}
                                setValue={ age => mergeProfile({ age }) }
                                options={[...Array(85 - 18 + 1).keys()].map(x => x + 18)}/>
                </div>
                <TextAreaField label="About me"
                                value={profile.bio}
                                setValue={bio => mergeProfile({ bio })}
                                max="1000"
                                rows="5" />
                <div className="col-4">
                    <SelectField label="How many roommates do you need?"
                                value={profile.desired_roommates}
                                setValue={ desired_roommates => mergeProfile({ desired_roommates }) }
                                options={[...Array(9).keys()].map(x => x + 1)}/>
                </div>
                <CheckBoxField label="Check this box if you have a residence."
                            checked={profile.hasResidence}
                            setChecked={ hasResidence => mergeProfile({ hasResidence }) } /> 
                <div>
                    <p className="mt-3 mb-0 fw-bold">Select your property references.</p>
                    <CheckBoxField label="Apartment"
                        checked={profile.apartment}
                        setChecked={ apartment => mergeProfile({ apartment }) } />
                    <CheckBoxField label="House"
                        checked={profile.house}
                        setChecked={ house => mergeProfile({ house }) } />
                    <CheckBoxField label="Condo"
                        checked={profile.condo}
                        setChecked={ condo => mergeProfile({ condo }) } />
                </div>
                <div>
                    <p className="mt-3 mb-0 fw-bold">Select your lifestyle references.</p>
                    <CheckBoxField label="Night-owl"
                        checked={profile.nightPerson}
                        setChecked={ nightPerson => mergeProfile({ nightPerson }) } />
                    <CheckBoxField label="Early-bird"
                        checked={profile.morningPerson}
                        setChecked={ morningPerson => mergeProfile({ morningPerson }) } />
                    <CheckBoxField label="Pet-friendly"
                        checked={profile.pets}
                        setChecked={ pets => mergeProfile({ pets }) } />
                    <CheckBoxField label="Likes to share food"
                        checked={profile.shareFood}
                        setChecked={ shareFood => mergeProfile({ shareFood }) } />
                </div>
                <div>
                    <p className="mt-3 mb-0 fw-bold">Select traits that describe you.</p>
                    <CheckBoxField label="Extrovert"
                        checked={profile.extrovert}
                        setChecked={ extrovert => mergeProfile({ extrovert }) } />
                    <CheckBoxField label="Introvert"
                        checked={profile.introvert}
                        setChecked={ introvert => mergeProfile({ introvert }) } />
                    <CheckBoxField label="I like to bring friends over"
                        checked={profile.bringFriendsOver}
                        setChecked={ bringFriendsOver => mergeProfile({ bringFriendsOver }) } />
                </div>
                <div>
                    <p className="mt-3 mb-0 fw-bold">Select what your potential roommates should know about you.</p>
                    <CheckBoxField label="Loud"
                        checked={profile.loud}
                        setChecked={ loud => mergeProfile({ loud }) } />
                    <CheckBoxField label="Messy"
                        checked={profile.messy}
                        setChecked={ messy => mergeProfile({ messy }) } />
                    <CheckBoxField label="I smoke"
                        checked={profile.smoker}
                        setChecked={ smoker => mergeProfile({ smoker }) } />
                    <CheckBoxField label="I am in a relationship"
                        checked={profile.relationship}
                        setChecked={ relationship => mergeProfile({ relationship }) } />
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