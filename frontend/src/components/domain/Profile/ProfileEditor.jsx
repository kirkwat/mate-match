//TODO make changes with api

import { useState, useEffect } from "react";
import { getProfileById } from "../../../api";
import { CheckBoxField, SelectField, TextField, TextAreaField } from "../../common";

export const ProfileEditor = () => {
    //DELETE - this is just an example until api is working
    const [ profile, setProfile ] = useState({name:"Kirk Watson",location:""});
    //TODO update for on click
    useEffect(() => {
        //getProfileById(1).then(x => setProfile(x));
    }, []);

    const mergeProfile = delta => setProfile({ ...profile, ...delta });


    if(!profile) {
        return <>Error loading profile...</>;
    }

    return <>
        <div className="container py-4">
            <div className="bg-light rounded p-5 pb-4 mb-4">
                <h1>Profile Editor</h1>
                <TextField label="Name"
                            id="name"
                            value={profile.name}
                            setValue={ name => mergeProfile({ name }) } />
                <TextField label="Location"
                            id="location"
                            value={profile.location}
                            setValue={ location => mergeProfile({ location }) } />
                <div className="col-1">
                    <SelectField label="Age"
                                value={profile.age}
                                setValue={ age => mergeProfile({ age }) }
                                options={[...Array(85 - 18 + 1).keys()].map(x => x + 18)}/>
                </div>
                <TextAreaField label="About me"
                                value={profile.bio}
                                setValue={profile.bio} />
                <div className="col-3">
                    <SelectField label="How many roommates do you need?"
                                value={profile.roommieCount}
                                setValue={ roommieCount => mergeProfile({ roommieCount }) }
                                options={[...Array(10).keys()].map(x => x + 1)}/>
                </div>
                <CheckBoxField label="Check this box if you have a residence."
                        checked={profile.hasResidence}
                        setChecked={ hasResidence => mergeProfile({ hasResidence }) } />
                <div>
                    <p className="mt-3 mb-0 fw-bold">Select your lifestyle references below.</p>
                    <CheckBoxField label="Night-owl"
                        checked={profile.nightOwl}
                        setChecked={ nightOwl => mergeProfile({ nightOwl }) } />
                    <CheckBoxField label="Early-bird"
                        checked={profile.earlyBird}
                        setChecked={ earlyBird => mergeProfile({ earlyBird }) } />
                    <CheckBoxField label="Smoke-free"
                        checked={profile.smokeFree}
                        setChecked={ smokeFree => mergeProfile({ smokeFree }) } />
                    <CheckBoxField label="Pet-friendly"
                        checked={profile.petFriendly}
                        setChecked={ petFriendly => mergeProfile({ petFriendly }) } />
                </div>
                <div>
                    <p className="mt-3 mb-0 fw-bold">Select your property references below.</p>
                    <CheckBoxField label="House"
                        checked={profile.house}
                        setChecked={ house => mergeProfile({ house }) } />
                    <CheckBoxField label="Apartment"
                        checked={profile.apartment}
                        setChecked={ apartment => mergeProfile({ apartment }) } />
                    <CheckBoxField label="Condo"
                        checked={profile.condo}
                        setChecked={ condo => mergeProfile({ condo }) } />
                </div>
                {console.log(profile)}
                <button type="button" className="btn btn-primary btn-lg col-12 mt-3">
                    Save Changes
                </button>
            </div>
        </div>
    </>;
};