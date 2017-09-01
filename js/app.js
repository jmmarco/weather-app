(function() {

  var ajaxPanel = document.getElementById('ajax-panel');

  function success(position) {

    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    var config = {
      baseUrl: 'https://api.openweathermap.org/data/2.5/weather?',
      apiKey: 'a0c73d6d433683c9d60648536464f183',
    };

    var url = config.baseUrl + 'lat=' + lat + '&lon=' + lon + '&units=metric' + '&appid=' + config.apiKey;

    // Using the new fetch API 
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

    fetch(url).then(
      function(response) {
        return response.json();
      }
    ).then(
      function(jsonData) {
        //handle json data processing here
        var location = jsonData.name;
        var countryCode = jsonData.sys.country;

        // Thanks to Tim Brayen for the inspiration:
        // https://gist.github.com/tbranyen/62d974681dea8ee0caa1
        var prefix = 'wi wi-';
        var code = jsonData.weather[0].id;

        // weatherIcons is a global array defined in a separate file
        var icon = weatherIcons[code].icon

        // If we are not in the ranges mentioned above, add a day/night prefix
        if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
          icon = 'day-' + icon;
        }

        // Finally attach the prefix
        icon = prefix + icon;

        // Set the temperature
        var celsius = jsonData.main.temp;

        // F = C x 1.8 + 32
        var farenheit = celsius * 1.8 + 32

        var currentTemperature = celsius;

        var units = document.createElement('div');
        units.className = 'units';

        var celsiusElement = document.createElement('a');
        celsiusElement.className = 'celsius';
        celsiusElement.href = '#';
        celsiusElement.textContent = 'C';
        var divider = document.createElement('span');
        divider.textContent = '|';
        var farenheitElement = document.createElement('a');
        farenheitElement.className = 'farenheit';
        farenheitElement.href = '#';
        farenheitElement.textContent = 'F';

        units.appendChild(celsiusElement);
        units.appendChild(divider);
        units.appendChild(farenheitElement);


        


        // Create the neceesary elements and then add them to the DOM
        var temperatureELement = document.createElement('p');
        temperatureELement.id = 'temperature';
        // temperatureELement += '°' + units
        temperatureELement.textContent = currentTemperature + '°';

        var weatherElement = document.createElement('i');
        weatherElement.className = icon

        var locationElement = document.createElement('p');
        locationElement.textContent = 'It looks like you\'re located in ' + location + ', ' + countryCode + '.';

        // Remove the loader spinner
        ajaxPanel.innerHTML = '';

        ajaxPanel.appendChild(weatherElement);
        ajaxPanel.appendChild(temperatureELement);
        ajaxPanel.appendChild(units);
        ajaxPanel.appendChild(locationElement);


        var temperatureSelect = function(unit) {
          if (unit === 'c') {
            currentTemperature = celsius;
          } else {
            currentTemperature = farenheit.toFixed(1);
          }

          return currentTemperature;

        }

        celsiusElement.addEventListener('click', function() {
          document.getElementById('temperature')
            .textContent = temperatureSelect('c');
        });


        farenheitElement.addEventListener('click', function() {
          document.getElementById('temperature')
            .textContent = temperatureSelect('f');
        });


      }

    ).catch(function(error) {
      console.log("Something went wrong. ", error)
      ajaxPanel.innerHTML = '<p class="text-danger text-center">Geolocation is not supported by your Browser, or was canceled by user.</p>';
    });

  }

  function error() {
    console.log('Geolocation is not supported by your Browser, or was canceled by user.');
    setTimeout(function() {
      ajaxPanel.innerHTML = '';
      ajaxPanel.innerHTML = '<p class="text-danger text-center">Geolocation is not supported by your Browser, or was canceled by user.</p>';
    }, 1);
  }

  navigator.geolocation.getCurrentPosition(success, error);

})();