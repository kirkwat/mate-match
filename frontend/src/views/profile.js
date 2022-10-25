(app => {

    var isLoaded;

    app.profileView = {
        load() {
            if (!isLoaded) {
                // Add stuff here for getting data from database and displaying it in p tag
            }

            app._changeView("profileView");
        }
    }

})(app || (app = {}));
