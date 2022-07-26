$(function () {
    document.addEventListener("deviceready", onDeviceReady, false);
    $('#tabCamera').show();
    $('.print').hide();
    $('#tabInfo').hide();
    $("#demo").hide();
    $('#tabNotes').hide();
    $('#tabQuote').hide();
    $('#tabSetting').hide();
    $('#tabNoteInternet').hide();
    $('.save-picture').hide();
    $('.contact-form').hide();
    $('.confirm-comp').hide();
    $('.w4rAnimated_checkmark').hide();
    //console.log($('.wifi'))
    setInterval(() => {
        if (navigator.connection.type === 'none') {
            $('.print').hide();
            $('#tabInfo').hide();
            $("#demo").hide();
            $('#tabNotes').hide();
            $('#tabQuote').hide();
            $('#tabSetting').hide();
            $('#tabNoteInternet').show();
            $('#tabCamera').hide();
        } else {
            $('#tabNoteInternet').hide();
        }
    }, 100);

    $('.sidenav').sidenav();	/* https://materializecss.com/sidenav.html */

    $('.sidenav a').click(function () {
        $('.spa').hide();
        $('#' + $(this).data('show')).show();
        $('.sidenav').sidenav('close');
    });
    $('select').formSelect();


});

function onDeviceReady() {
    //console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    $('.modal').modal();
    $('.materialboxed').materialbox();
    // Camera
    $('#cameraTakePicture').click(function () {
        Camera.takePicture();
    })
    $('#cameraGetPicture').click(function () {
        Camera.getPicture();
    })
    $('.save-picture').click(function () {
        Camera.savePicture();
    })
    // Database
    Sqlite.initDatabase();
    $('.notes').on('click', '.delete', function () {
        Sqlite.id($(this).data('id'));
        Sqlite.delete()
    })
        .on('click', '.edit', function (e) {
            Sqlite.id($(this).data('id'));
            Sqlite.edit(e);
            $('.save-edit').on('click', function (e) {
                Sqlite.saveEdit(e)
            })
        })
    $('.save').on('click', function () {
        Sqlite.save();
    });

    // Form

    // Theme
    if (localStorage.getItem("theme")) {

        $('#theme').on('click', function () {
            Theme.checkTheme();
            Theme.changeTheme();
        })
    } else {
        localStorage.setItem('theme', 'dark');
        // $('#theme')[0].checked( true);
    }
}
