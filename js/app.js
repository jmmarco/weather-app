// Get Coordinates

function geoFindMe() {

    var output = $('#out');

    if (!navigator.geolocation) {
        output.html('<h4>Geolocation is not supported by your Browser</h4>');
        return;
    }

    function success(position) {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        output.html('<h4>Latitude is: ' + lat + '° <br>Longitude is ' + lon + '°</h4>');

        var img = new Image();
        img.src = 'https://maps.googleapis.com/maps/api/staticmap?center=' + lat + ',' + lon + '&zoom=8&size=300x300&sensor=false';
        output.append(img);

        var config = {
            apiKey : '0e9a952df087f4f3582c374303cf7e7e',
        };

        // AJAX Request
        var weatherUrl = 'api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&APPID=' + config.apiKey;
        $.ajax({

            url: weatherUrl,

            beforeSend: function() {
                // this is where we append a loading image
                $('#ajax-panel').html('<div class="loading"><img src="images/loading.gif" alt="Loading..." /></div>');
            },
            success: function(data) {
                // successful request; do something with the data
                $('#ajax-panel').empty();
                $(data).find('item').each(function(i) {
                    $('#ajax-panel').append('<h4>' + $(this).find('title').text() + '</h4><p>' + $(this).find('link').text() + '</p>');
                });
            },
            error: function() {
                // failed request; give feedback to user
                $('#ajax-panel').html('<p class="error"><strong>Oops!</strong> Try that again in a few moments.</p>');
            }
        });
    } // End of success

    function error() {
        output.html('Unable to retrieve your location');
    }

    output.html('<h4>Locating...</h4>');

    navigator.geolocation.getCurrentPosition(success, error);
}
