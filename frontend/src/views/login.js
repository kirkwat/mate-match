(app => {

    app.loginView = {
        load() {
            

            app._changeView("loginView");
        }
    }

})(app || (app = {}));