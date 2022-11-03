(app => {

    class Profile {
        constructor(name, location, bio, gender, age, lifestylePreference, propertyPreference, roomates) {
            this.name = name
            this.location = location
            this.bio = bio
            this.gender = gender
            this.age = age
            this.lifestylePreference = lifestylePreference
            this.propertyPreference = propertyPreference
            this.roomates = roomates
        }
    }

    app.Profile = Profile;
    var prof;

    const profiles = [
        new Profile("Kyle", "Dallas", "This is a test", "Male", 24, "Quiet", "Appartment", 2),
        new Profile("Joe", "Austin", "This is another test", "Male", 19, "Smoke-free", "Condo", 3)
    ]

    var toggled = false;

    app.home = {
        getProfiles() {
            return profiles;
        },

        setMenuActive() {
            var button1 = document.querySelector("#menuProfile");
            var button2 = document.querySelector("#menuLogin");
            var button3 = document.querySelector("#menuSignup");

            button1.className = "menuActive";
            button2.className = "menuActive";
            button3.className = "menuActive";
        },

        setMenuHidden() {
            var button1 = document.querySelector("#menuProfile");
            var button2 = document.querySelector("#menuLogin");
            var button3 = document.querySelector("#menuSignup");

            button1.className = "menuHidden";
            button2.className = "menuHidden";
            button3.className = "menuHidden";
        },

        toggleMenu() {
            console.log(toggled);
            if (toggled) {
                this.setMenuHidden();
                toggled = false;
            }

            else {
                this.setMenuActive();
                toggled = true;
            }
        }
    }



})(app || (app = {}));
