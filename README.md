# A simple weather app that uses the [OpenWeatherMap API](https://openweathermap.org/current)

## Quickstart

- Clone the repository
- Sign up and get an API key from [OpenWeatherMap](https://openweathermap.org)
- [Get the current API URL](https://openweathermap.org/current), typically it will be: `https://api.openweathermap.org/data/2.5/weather?`
- Rename `.env.example` to `.env` file and add your API key and API URL
- To run the project use a local server like [http-server](https://www.npmjs.com/package/http-server)

  Open the console from the project directory and run it like this:

  ```bash
  npx http-server
  ```

### Details

- Main code is built using vanilla JavaScript and the new [`fetch` API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) and the [geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation)
- Basic styling using [Bootstrap's Jumbotron](https://getbootstrap.com/docs/3.3/components/#jumbotron)
- Thanks to Erik Flowers and his [Weather Icons library](https://github.com/erikflowers/weather-icons)
