import config from './config.js';

(function async() {
  config.initialize();
  const ajaxPanel = document.getElementById('ajax-panel');

  function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const url =
      process.env.API_URL +
      'lat=' +
      lat +
      '&lon=' +
      lon +
      '&units=metric' +
      '&appid=' +
      process.env.API_KEY;

    // Using the new fetch API
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (jsonData) {
        //handle json data processing here
        const location = jsonData.name;
        const countryCode = jsonData.sys.country;

        // Thanks to Tim Brayen for the inspiration:
        // https://gist.github.com/tbranyen/62d974681dea8ee0caa1
        const prefix = 'wi wi-';
        const code = jsonData.weather[0].id;

        // weatherIcons is a global array defined in a separate file
        let icon = weatherIcons[code].icon;

        // If we are not in the ranges mentioned above, add a day/night prefix
        if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
          icon = 'day-' + icon;
        }

        // Finally attach the prefix
        icon = prefix + icon;

        // Set the temperature
        const celsius = jsonData.main.temp;

        // F = C x 1.8 + 32
        const fahrenheit = celsius * 1.8 + 32;

        const currentTemperature = celsius;

        const units = document.createElement('div');
        units.className = 'units';

        const celsiusElement = document.createElement('a');
        celsiusElement.className = 'celsius';
        celsiusElement.href = '#';
        celsiusElement.textContent = 'C';
        const divider = document.createElement('span');
        divider.textContent = '|';
        const fahrenheitElement = document.createElement('a');
        fahrenheitElement.className = 'fahrenheit';
        fahrenheitElement.href = '#';
        fahrenheitElement.textContent = 'F';

        units.appendChild(celsiusElement);
        units.appendChild(divider);
        units.appendChild(fahrenheitElement);

        // Create the necessary elements and then add them to the DOM
        const temperatureELement = document.createElement('p');
        temperatureELement.id = 'temperature';
        // temperatureELement += '°' + units
        temperatureELement.textContent = currentTemperature + '°';

        const weatherElement = document.createElement('i');
        weatherElement.className = icon;

        const locationElement = document.createElement('p');
        locationElement.textContent =
          "It looks like you're located in " +
          location +
          ', ' +
          countryCode +
          '.';

        // Remove the loader spinner
        ajaxPanel.innerHTML = '';

        ajaxPanel.appendChild(weatherElement);
        ajaxPanel.appendChild(temperatureELement);
        ajaxPanel.appendChild(units);
        ajaxPanel.appendChild(locationElement);

        const temperatureSelect = function (unit) {
          if (unit === 'c') {
            currentTemperature = celsius;
          } else {
            currentTemperature = fahrenheit.toFixed(1);
          }

          return currentTemperature;
        };

        celsiusElement.addEventListener('click', function () {
          document.getElementById('temperature').textContent =
            temperatureSelect('c');
        });

        fahrenheitElement.addEventListener('click', function () {
          document.getElementById('temperature').textContent =
            temperatureSelect('f');
        });
      })
      .catch(function (error) {
        console.error('Something went wrong. ', error);
        ajaxPanel.innerHTML =
          '<p class="text-danger text-center">Geolocation is not supported by your Browser, or was canceled by user.</p>';
      });
  }

  function error() {
    console.log(
      'Geolocation is not supported by your Browser, or was canceled by user.'
    );
    setTimeout(function () {
      ajaxPanel.innerHTML = '';
      ajaxPanel.innerHTML =
        '<p class="text-danger text-center">Geolocation is not supported by your Browser, or was canceled by user.</p>';
    }, 1);
  }

  navigator.geolocation.getCurrentPosition(success, error);
})();
