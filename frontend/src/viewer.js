(app => {
    app._changeView = viewId => {
        let sections = document.querySelectorAll('main > section');
        sections.forEach(section => {
            section.classList.remove('active');
        });

        document.getElementById(viewId).classList.add('active');
    };

})(app || (app = {}));