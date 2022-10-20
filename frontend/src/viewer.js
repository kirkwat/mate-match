(app => {

    // You do not need to do anything in this file. You're welcome. :)

    app._changeView = viewId => {
        let sections = document.querySelectorAll('main > section');
        sections.forEach(section => {
            section.classList.remove('active');
        });

        document.getElementById(viewId).classList.add('active');
    };

})(app || (app = {}));