import { useState } from "react";
import { CheckBoxField } from "./CheckBoxField";

export const CheckBoxDropdown = ({ dd_label, labels, values, setValues }) => {

    const [checked, setChecked] = useState(values);


    const mergeSearch1 = delta => {

        const newChedked = [...checked];
        newChedked[delta]=!newChedked[delta];

        console.log("delta",delta);
        console.log("original",checked);
        console.log("changed",newChedked);


        setChecked( newChedked )
        setValues(newChedked)
    };

    const handleToggle = (value) => {

        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        setChecked(newChecked)
        setValues(newChecked)
        //update this checked information into Parent Component 

    }

    return <>
        <div className="dropdown">
            <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                { dd_label }
            </button>
            <ul className="dropdown-menu">
                {labels.map((label, index) =>
                    <li className="ps-2" key={index}>



                        {console.log("checkbox",values,index,label)}





                        <div className="form-check form-check-inline ps-0 pe-1">
                            <label htmlFor="value">
                                <input type="checkbox"
                                    name="value"
                                    id="value"
                                    checked={values[index]}
                                    onChange={() => mergeSearch1(index)}
                                    className="me-2" />
                                { label }
                            </label>
                        </div>






                    </li>)
                }
            </ul>
        </div>
    </>
};