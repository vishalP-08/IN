// JavaScript
document.addEventListener('DOMContentLoaded', function () {
  const fetchButton = document.getElementById('fetchButton');
  const mapIframe = document.getElementById('mapIframe');
  const weatherDataDiv = document.getElementById('weatherData');
  const latitudeSpan = document.getElementById('latitude');
  const longitudeSpan = document.getElementById('longitude');

  // Replace 'YOUR_OPENWEATHERMAP_API_KEY' with your actual API key
  const apiKey = 'a4115d61d98df1ff62e2b4a54623a084';

  fetchButton.addEventListener('click', () => {
      // 1. Fetch Geolocation
      if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(async (position) => {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;

              // 2. Display Latitude and Longitude
              latitudeSpan.textContent = latitude.toFixed(6); // Format to 6 decimal places
              longitudeSpan.textContent = longitude.toFixed(6); // Format to 6 decimal places

              // 3. Display Map with Updated Coordinates
              const mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;
              mapIframe.src = mapUrl;

              // 4. Fetch Weather Data
              const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

              try {
                  const response = await fetch(apiUrl);
                  const data = await response.json();

                  // 5. Display Weather Data
                  weatherDataDiv.innerHTML = `
                      <h2>Weather Information</h2>
                      <p>Temperature: ${data.current.temp}°C</p>
                      <p>Humidity: ${data.current.humidity}%</p>
                      <p>Wind Speed: ${data.current.wind_speed} m/s</p>
                      <!-- Add more weather information as needed -->
                  `;
              } catch (error) {
                  console.error('Error fetching weather data:', error);
              }
          });
      } else {
          alert('Geolocation is not supported in this browser.');
      }
  });
});

// JavaScript in script.js
function redirectToNewPage() {
  if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
          const latitude = position.coords.latitude.toFixed(6);
          const longitude = position.coords.longitude.toFixed(6);

          // Redirect to the new page with latitude and longitude as URL parameters
          window.location.href = `newpage.html?lat=${latitude}&lon=${longitude}`;
      });
  } else {
      alert('Geolocation is not supported in this browser.');
  }
}

