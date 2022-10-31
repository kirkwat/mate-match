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

    app.home = {
        getProfiles() {
            return profiles;
        }
    }



})(app || (app = {}));
