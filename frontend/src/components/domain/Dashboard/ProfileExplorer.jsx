import {useRef, useState, useEffect} from "react";
import { SearchField, CheckBoxDropdown } from "../../common";

export const ProfileExplorer = () => { 

    let preferences0=["dog","cat","late","early"];
    let preferences1={dog:false,cat:true,late:false,early:true}

    const [ search, setSearch ] = useState({name:"",dog:true,cat:false,late:true,early:false});

    const mergeSearch = delta => setSearch({ ...search, ...delta });

    return <>
        <div className="container py-4">
            <div className="bg-light rounded p-5 pb-4 mb-4">
                <h1>Profile Explorer</h1>
                <SearchField id="username"
                        value={search.name}
                        setValue={ x => mergeSearch({ x }) } />
                <CheckBoxDropdown dd_label="Preferences" 
                        labels={preferences0} 
                        values={search} 
                        setValues={x => mergeSearch({x})}/>
                {console.log(search)}
            </div>
        </div>

    </>;
};