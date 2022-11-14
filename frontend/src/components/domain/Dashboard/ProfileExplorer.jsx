import {useRef, useState, useEffect} from "react";
import { SearchField, CheckBoxDropdown } from "../../common";

export const ProfileExplorer = () => { 

    let preferences0=["dog","cat","late","early"];
    let preferences1=[false,true,false,true]
    const [ search, setSearch ] = useState({name:"",dog:true,cat:false,late:true,early:false});
    const [ pref, setPref ] = useState([false,true,false,true]);

    const mergeSearch = delta => setSearch({ ...search, ...delta });
    const mergePreferences = delta => setPref({ ...pref, ...delta });

    return <>
        <div className="container py-4">
            <div className="bg-light rounded p-5 pb-4 mb-4">
                <h1>Profile Explorer</h1>
                <SearchField id="username"
                        value={search.name}
                        setValue={ name => mergeSearch({ name }) } />
                <CheckBoxDropdown dd_label="Preferences" 
                        labels={preferences0} 
                        values={pref} 
                        setValues={x => setPref({x})}/>
                {console.log("in explorer",pref)}
            </div>
        </div>

    </>;
};