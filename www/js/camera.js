let Camera = function () {
    function cameraTakePicture() {

        function onSuccess(imageData) {
            $('#myImage').attr('src',"data:image/jpeg;base64," + imageData);
            //console.log(image.src);
            $('.save-picture').show();
        }

        function onFail(message) {
            alert('Failed because: ' + message);
        }
        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL
        });
    }
    function cameraSavePicture(){
        let image = $('#myImage').attr('src');
        window.cordova.plugins.imagesaver.saveImageToGallery(image, onSaveImageSuccess, onSaveImageError);

        function onSaveImageSuccess(e) {
            //console.log('--------------success');
        }

        function onSaveImageError(error) {
            //console.log('--------------error: ' + error);
        }
    }

    function cameraGetPicture() {
        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 70,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY
        });

        function onSuccess(imageURL) {
            $('#myImage').attr('src', imageURL);
        }

        function onFail(message) {
            alert('Failed because: ' + message);
        }

    }

    return{
        takePicture:cameraTakePicture,
        getPicture:cameraGetPicture,
        savePicture:cameraSavePicture,
    }
}();