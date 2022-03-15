let navItems = document.querySelectorAll('.navItem');

let { pathname: path } = window.location;

navItems.forEach((element) => {
    element.classList.remove('active');

    if (element.id == path) {
        element.classList.add('active');
    }
});
