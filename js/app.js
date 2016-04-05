(function() {
  var output = $('#out');

  if (!navigator.geolocation) {
    output.html('<h4>Geolocation is not supported by your Browser</h4>');
    return;
  }

  function success(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    //output.html('<h4>Latitude is: ' + lat + '&deg; <br>Longitude is ' + lon + '&deg;</h4>');

    var img = new Image();
    img.src = 'https://maps.googleapis.com/maps/api/staticmap?center=' + lat + ',' + lon + '&zoom=13&size=300x300&sensor=false';
    output.html(img);
    //$('img').attr('class', 'center-block');

    var unit = function(value) {
      if (value == 'metric')
        return value;
      else if (value == 'farenheit')
        return value;
    };


    var config = {
      apiKey: '0e9a952df087f4f3582c374303cf7e7e',
      units: '&units=' + unit
    };

    // AJAX Request
    var weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&APPID=' + config.apiKey;
    console.log(weatherUrl);
    $.ajax({

      url: weatherUrl,
      dataType: 'jsonp',

      // Display a loading wheel while data is fetched
      beforeSend: function() {
        $('#ajax-panel').html('<div class="loading"><img src="images/loading_bullets.gif" alt="Loading..." /></div>');
      },
      // On success do stuff
      success: function(data) {

        // Credit: https://gist.github.com/tbranyen/62d974681dea8ee0caa1

        /*console.log(weatherIcons);
        req = $.getJSON('http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&APPID=' + config.apiKey + '&callback=?');
        req.then(function(data) { */
          var prefix = 'wi wi-';
          var code = data.weather[0].id;
          console.log(code);
          var icon = weatherIcons[code].icon;

          // If we are not in the ranges mentioned above, add a day/night prefix.
          if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
            icon = 'day-' + icon;
          }

          // Finally tack on the prefix.
          icon = prefix + icon;


        console.log(data.weather);
        //var icon = '<img id="icon" src="http://openweathermap.org/img/w/' + data.weather[0].icon + '.png" alt="Weather icon" width="80">';
        var wIcon = '<i class="' + icon + '"></i>';
        var location = "<p>It looks like you're located in: " + data.name + ', ' + data.sys.country + '</p>';
        var celsius = Math.round(data.main.temp - 273.15);
        var farenheit = Math.round(9 / 5 * (data.main.temp - 273.15) + 32);

        var temp = '<p class="temp">' + '<span class="active">' + celsius + '&deg;' + 'C' + '</span>' + ' | ' + '<span class="inactive">F</span>' + '</p>';


        $('#ajax-panel').empty();
        $('#ajax-panel').append(location);
        $('#ajax-panel').append(wIcon);
        $('#ajax-panel').append(temp);
        //$('.wi').addClass('');
        $('.temp').attr('class', 'text-center');
        $('p').addClass('location');

        /*$('#switch').on('click', function() {
            $('#ajax-panel').find('span').remove();
            $('#ajax-panel').append(farenheit);
        });*/


        $('.inactive').hover(function() {
          console.log(this);
          $(this).addClass('highlight');
        }, function() {
          $(this).removeClass('highlight');
        });


        $(document).on('click', '.temp', function() {
          console.log(this);
          $(this).remove();
          console.log(this);

        });



        $(data).find('item').each(function(i) {
          console.log(this);
          $('#ajax-panel').append('<h4>' + $(this).find('title').text() + '</h4><p>' + $(this).find('link').text() + '</p>');
        });
      },
      // If something went wrong..
      error: function() {
        $('#ajax-panel').html('<p class="error"><strong>Oops!</strong> Try that again in a few moments.</p>');
      }
    });
  } // End of success

  function error() {
    output.html('Unable to retrieve your location');
  }

  output.html('<h4>Locating...</h4>');
  output.append('<div class="loading"><img src="images/loading_bullets.gif" alt="Loading..." /></div>');


  navigator.geolocation.getCurrentPosition(success, error);

})();
