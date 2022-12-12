import { useState } from "react";
import { CheckBoxField } from "./CheckBoxField";

export const CheckBoxDropdown = ({ dd_label, options, setValues }) => {
  const [checked, setChecked] = useState(options);

  const handleToggle = (id) => {
    const newChecked = [...checked];
    newChecked[id].value = !newChecked[id].value;

    setChecked(newChecked);
    setValues(newChecked);
  };

  return (
    <>
      <div className="dropdown">
        <button
          className="btn btn-primary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {dd_label}
        </button>
        <ul className="dropdown-menu">
          {options.map((option, index) => (
            <li className="ps-2 pe-0" key={index}>
              <CheckBoxField
                label={option.display}
                checked={option.value}
                setChecked={() => handleToggle(index)}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
