let currentTheme = localStorage.getItem('theme');
root = document.documentElement;
let light = function () {
    $('body').removeClass('blue-grey darken-3 white-text')
    $('#nav-mobile').removeClass('blue-grey darken-3 white-text')
    $('#nav-mobile a').removeClass('white-text');
    $('#nav-mobile i').removeClass('white-text');
    $('input').removeClass('white-text');
    $('textarea').removeClass('white-text');
    $('td a').removeClass('white-text').addClass('black-text');
}

let Theme = (function () {
    let dark = function () {
        $('body').addClass('blue-grey darken-3 white-text');
        $('#nav-mobile').addClass('blue-grey darken-3 white-text');
        $('#nav-mobile a').addClass('white-text');
        $('#nav-mobile i').addClass('white-text');
        $('input').addClass('white-text');
        $('textarea').addClass('white-text');
        $('td a').addClass('white-text');
    }
    const checkTheme = function () {
        if ($('#theme')[0].checked) {
            //console.log('checked')
            localStorage.setItem('theme', 'light');
            currentTheme = localStorage.getItem('theme');
            //console.log(currentTheme);
        } else {
            //console.log('not checked')
            localStorage.setItem('theme', 'dark');
            currentTheme = localStorage.getItem('theme');
            //console.log(currentTheme);
        }
    }
    let changeTheme = function () {
        if (currentTheme === 'dark') {
            $('#theme').attr('checked', false);
            root.setAttribute('data-theme', currentTheme);
            dark();
        } else {
            root.setAttribute('data-theme', currentTheme);
            light();
        }
    }


    return {
        checkTheme: checkTheme,
        changeTheme: changeTheme
    }
})();

