(app => {
    var isLoaded;
   
    app.homeView_logged = {
        load() {
            app.home.setMenuHidden();
            if (!isLoaded) {
                var heading = document.getElementById("homeViewHeading");
                var profileList = app.home.getProfiles();
                var fragment = document.createDocumentFragment();

                var loggedInUser = "John"      //Add code for this one we learn sessions

                heading.innerText = `Welcome, ${loggedInUser}`;

                var profileCards = document.querySelector(".profileCardContainer");
                var profileCardTemp = document.querySelector(".profileCardTemp")

                for (var i in profileList) {
                    let currentProfile = profileList[i];
                    console.log(profileCardTemp.content);
                    let newNode = profileCardTemp.content.cloneNode(true);
                    newNode.querySelector("#profileCardName").innerText = currentProfile.name;
                    newNode.querySelector("#profileCardLocation").innerText = `Location: ${currentProfile.location}`;
                    newNode.querySelector("#profileCardGender").innerText = `Gender: ${currentProfile.gender}`;
                    newNode.querySelector("#profileCardAge").innerText = `Age: ${currentProfile.age}`;
                    fragment.appendChild(newNode);
                }

                profileCards.appendChild(fragment);
                isLoaded = true;
        }



            app._changeView("homeView_logged");
        }
    }

})(app || (app = {}));
