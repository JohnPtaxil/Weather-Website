// Function to retrieve weather data when button is clicked
function getWeather() {
    // Setting API keys
    const apiKey = '53beb531efc6b1f7a9f49d11e0108b6d';
    const city = document.getElementById('city').value;

    // If no city is entered
    if (!city) {
        alert('Please Enter a City!');
        return;
    }

    // Set current weather and forecast URLs
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    // Retrieve current weather data
    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            alert('Error fetching current weather data. Please try again.');
        });

    // Retrieve hourly forecast data
    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data.list);
        })
        .catch(error => {
            console.error('Error fetching hourly forecast data:', error);
            alert('Error fetching hourly forecast data. Please try again.');
        });
}

// Function to show all retrieved data
function displayWeather(data) {
    // Setting data to HTML elements
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    // Clear previous content
    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';

    // If no data found (city does not exist)
    if (data.cod === '404') {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    }
    // If city exists
    else {
        // Assigning data retrieved from API to local variables
        const cityName = data.name;

        // Converting temp from Kelvin to Celsius
        const temperature = Math.round(data.main.temp - 273.15);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        // Setting temp and weather variables to HTML
        const temperatureHTML = `<p>${temperature}°C</p>`;
        const weatherHTML = `<p>${cityName}</p> <p>${description}</p>`;

        tempDivInfo.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHTML;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        showImage();
    }
}

// Function to display hourly forecast
function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    const next24Hours = hourlyData.slice(0, 8);

    // Iterate over data items
    next24Hours.forEach(item => {
        // Extract relevant data
        const dateTime = new Date(item.dt * 1000);
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15);
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHTML = `
            <div class="hourly-item">
                <span>${hour}:00</span> 
                <img src="${iconUrl}" alt="Hourly Weather Icon"> 
                <span>${temperature}°C</span> 
            </div>`;

        hourlyForecastDiv.innerHTML += hourlyItemHTML;
    });
}

// Function to show the weather icon
function showImage() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block';
}
