$('select').change(function () {
    //console.log($(this).val())
    let text = capitalizeFirstLetter($(this).val())
    $('.complaint-label').text('Form ' + text)
    $('#type').val(text)
    $('.contact-form').show();
})
$('.comp').on('click', function () {
    //console.log($('#type').val())
    $.ajax({
        url: 'https://nathan655.sinners.be/form.php',
        type: 'POST',
        data: {
            type:$('#type').val(),
            firstName: $('#first_name').val(),
            lastName:$('#last_name').val(),
            email: $('#email').val(),
            complaint: $('#complaint').val()
        },
        success: function(msg) {
            alert('Email Sent');
            if (msg==="Connected Successfully.New complaint created successfully"){
                $('.contact-form').hide("slideUp").delay(2000);
                $('.confirm-comp').show().delay(2000).fadeOut();
            }else {
                $('.w4rAnimated_checkmark').show().delay(5000).fadeOut();
            }
            //console.log(msg);
        }
    });
});


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
const form = function (){

}