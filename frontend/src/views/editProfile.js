(app => {

    var isLoaded;

    app.profileViewEdit = {
        load() {
            if (!isLoaded) {
                // Add stuff here for clearing inputs
            }

            app._changeView("profileViewEdit");
        }
    }

})(app || (app = {}));