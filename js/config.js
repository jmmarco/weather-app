window.process = {
  env: {
    API_KEY: 'OPEN_WEATHER_API_KEY',
    API_URL: 'OPEN_WEATHER_API_URL',
  },
};

const loadEnvironmentVariables = async () => {
  const response = await fetch('../.env');
  console.log(response);
  const text = await response.text();
  console.log('text', text);
  const lines = text.split('\n');

  lines.forEach((line) => {
    const [key, value] = line.split('=');
    if (key && value) {
      window.process.env[key.trim()] = value.trim();
    }
  });

  console.log('window.process.env', window.process.env);
};

const config = {
  initialize: async () => {
    await loadEnvironmentVariables();
  },
  API_KEY: window.process.env.API_KEY,
  API_URL: window.process.env.API_URL,
};

export default config;
