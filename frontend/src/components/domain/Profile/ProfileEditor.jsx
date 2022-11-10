//TODO get working once api is working

import { useState, useEffect } from "react";
import { getProfileById } from "../../../api";
import { CheckBoxField, SelectField, TextField, TextAreaField } from "../../common";

export const ProfileEditor = () => {

    let profile={name:"Kirk Watson"}

    const [ profile1, setProfile ] = useState(undefined);
    //TODO update for on click
    useEffect(() => {
        getProfileById(1).then(x => setProfile(x));
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
                        value={profile.name}
                        setValue={ name => mergeProfile({ name }) } />
            <TextField label="Location"
                        value={profile.location}
                        setValue={ location => mergeProfile({ location }) } />
            <CheckBoxField label="Is Employee"
                        checked={profile.isEmployee}
                        setChecked={ isEmployee => mergeProfile({ isEmployee }) } />

            </div>
        </div>
    </>;
};

//name - text field
//location - text field
//age - select field with range of numbers
//bio - textarea field
//has residence - checkbox field
//roommates needed - select field with range of numbers
//professional experience - checkbox fields with different options
//lifestyle experience - checkbox fields with different options