import { useState, useEffect } from "react";
import { SearchField, CheckBoxDropdown } from "../../common";
import { Filter } from "../../../models";

export const ProfileSearch = ({ profiles, setSearchResults }) => {
  const lifestyleFilters = [
    new Filter("nightPerson", "Night-owl", false),
    new Filter("morningPerson", "Early-bird", false),
    new Filter("pets", "Pet-Friendly", false),
    new Filter("shareFood", "Shares Food", false),
  ];

  const propertyFilters = [
    new Filter("apartment", "Apartment", false),
    new Filter("house", "House", false),
    new Filter("condo", "Condo", false),
    new Filter("hasResidence", "Has Housing", false),
  ];

  const ageFilters = [
    new Filter("18-23", "18-23", false),
    new Filter("24-29", "24-29", false),
    new Filter("30+", "30+", false),
  ];

  const genderFilters = [
    new Filter("male", "Man", false),
    new Filter("female", "Woman", false),
  ];

  const [lifestylePref, setLifestylePref] = useState(lifestyleFilters);
  const [propertyPref, setPropertyPref] = useState(propertyFilters);
  const [agePref, setAgePref] = useState(ageFilters);
  const [genderPref, setGenderPref] = useState(genderFilters);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let results = profiles;
    //update with search
    if (search !== "") {
      results = results.filter(
        (profile) =>
          profile.name.toLowerCase().indexOf(search.toLowerCase()) >= 0 ||
          profile.city.toLowerCase().indexOf(search.toLowerCase()) >= 0
      );
    }
    //update with lifestyle filter
    const lifeFilters = lifestylePref.filter((pref) => pref.value);
    if (lifeFilters.length !== 0) {
      results = results.filter((profile) => {
        let filterCheck = true;
        lifeFilters.forEach((pref) => {
          if (!profile[pref.id]) {
            filterCheck = false;
          }
        });
        return filterCheck;
      });
    }
    //update with property filter
    const propFilters = propertyPref.filter((pref) => pref.value);
    if (propFilters.length !== 0) {
      results = results.filter((profile) => {
        let filterCheck = true;
        propFilters.forEach((pref) => {
          if (!profile[pref.id]) {
            filterCheck = false;
          }
        });
        return filterCheck;
      });
    }
    //update with age filter
    const yearFilters = agePref.filter((pref) => pref.value);
    if (yearFilters.length !== 0 && yearFilters.length !== 3) {
      results = results.filter((profile) => {
        let filterCheck = false;
        yearFilters.forEach((pref) => {
          if (pref.id === "18-23") {
            if (18 <= profile.age && profile.age <= 23) filterCheck = true;
          } else if (pref.id === "24-29") {
            if (24 <= profile.age && profile.age <= 29) filterCheck = true;
          } else if (pref.id === "30+") {
            if (30 <= profile.age) filterCheck = true;
          }
        });
        return filterCheck;
      });
    }
    //update with gender filter
    const genFilters = genderPref.filter((pref) => pref.value);
    if (genFilters.length !== 0 && genFilters.length !== 2) {
      results = results.filter((profile) => {
        let filterCheck = true;
        genFilters.forEach((pref) => {
          if (profile.gender !== pref.id) {
            filterCheck = false;
          }
        });
        return filterCheck;
      });
    }
    setSearchResults(results);
  }, [lifestylePref, propertyPref, agePref, genderPref, search]);

  return (
    <>
      <h1>Profile Explorer</h1>
      <div className="row justify-content-start">
        <div className="col-xs-12 col-md-6 col-lg-4">
          <SearchField value={search} setValue={(s) => setSearch(s)} />
        </div>
        <div className="col-lg-8 d-flex align-content-start flex-wrap ps-lg-0">
          <div className="d-flex align-content-start pb-2 pb-sm-0">
            <div className="pe-3">
              <CheckBoxDropdown
                dd_label="Lifestyle "
                options={lifestylePref}
                setValues={setLifestylePref}
              />
            </div>
            <div className="pe-3">
              <CheckBoxDropdown
                dd_label="Property "
                options={propertyPref}
                setValues={setPropertyPref}
              />
            </div>
          </div>
          <div className="d-flex align-content-start">
            <div className="pe-3">
              <CheckBoxDropdown
                dd_label="Gender "
                options={genderPref}
                setValues={setGenderPref}
              />
            </div>
            <div className="pe-3">
              <CheckBoxDropdown
                dd_label="Age "
                options={agePref}
                setValues={setAgePref}
              />
            </div>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};
