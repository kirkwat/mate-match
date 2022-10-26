(app => {

    var isLoaded;

    app.profileView = {
        load() {
            if (!isLoaded) {
                // Add stuff here for getting data from database and displaying it in p tag
                if (app.prof != null) {
                    var name = document.querySelector(".nameClass > p");
                    var location = document.querySelector(".locationClass > p");
                    var bio = document.querySelector(".bioClass > p");
                    var gender = document.querySelector(".genderClass > p");
                    var age = document.querySelector(".ageClass > p");
                    var lifestylePreference = document.querySelector(".lifestyleClass > p");
                    var propertyPreference = document.querySelector(".propertyClass > p");
                    var roomates = document.querySelector(".roomateClass > p");

                    name.innerText = app.prof.name;
                    location.innerText = app.prof.location;
                    bio.innerText = app.prof.bio;
                    gender.innerText = app.prof.gender;
                    age.innerText = app.prof.age;
                    lifestylePreference.innerText = app.prof.lifestylePreference;
                    propertyPreference.innerText = app.prof.propertyPreference;
                    roomates.innerText = app.prof.roomates;
                }
            }

            app._changeView("profileView");
        }
    }

})(app || (app = {}));
