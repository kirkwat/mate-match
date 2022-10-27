(app => {

    var isLoaded;

    app.profileViewEdit = {
        load() {
            app._changeView("profileViewEdit");
        },

        save() {
            var name = document.querySelector("#profileName").value;
            var location = document.querySelector("#profileLocation").value;
            var bio = document.querySelector("#profileBio").value;
            var gender = document.querySelector("#profileGender").value;
            var age = document.querySelector("#profileAge").value;
            var lifestylePreference = document.querySelectorAll(".lifestyeChoice");
            var propertyPreference = document.querySelectorAll(".propertyChoice");
            var roomates = document.querySelector("#roomateNumber").value;

            lifestylePreference = this.filterArray(lifestylePreference);
            propertyPreference = this.filterArray(propertyPreference);

            app.prof = new app.Profile(name, location, bio, gender, age, lifestylePreference, propertyPreference, roomates);;
            app.profileView.load();
        },

        filterArray(choices) {
           var newArray = [];
            for (var i = 0; i < choices.length; i++) {
                var current = choices[i];
                if (current.checked) {
                    newArray.push(current.name);
                }
            }
            return newArray;
        }, 

        clearArray(choices) {
            for (var i = 0; i < choices.length; i++) {
                choices[i].checked = 0;    
            }
        },
    }

})(app || (app = {}));