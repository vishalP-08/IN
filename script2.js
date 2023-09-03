// JavaScript in script.js for newpage.html
document.addEventListener('DOMContentLoaded', function () {
        const latitudeSpan = document.getElementById('latitude');
        const longitudeSpan = document.getElementById('longitude');
        const mapIframe = document.getElementById('mapIframe');
    
        // Extract latitude and longitude from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const latitude = urlParams.get('lat');
        const longitude = urlParams.get('lon');
    
        // Update latitude and longitude in the HTML
        if (latitude && longitude) {
            latitudeSpan.textContent = latitude;
            longitudeSpan.textContent = longitude;
    
            // Update the iframe's src attribute with the Google Maps URL
            const mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;
            mapIframe.src = mapUrl;
        } else {
            // Handle missing or invalid latitude and longitude
            latitudeSpan.textContent = 'N/A';
            longitudeSpan.textContent = 'N/A';
        }

          

        // Fetch weather data from OpenWeather API
        const apiKey = 'a4115d61d98df1ff62e2b4a54623a084'; // Replace with your API key
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Update weather data placeholders with actual data
                document.getElementById('location').textContent = data.name;
                document.getElementById('windSpeed').textContent = data.wind.speed + ' m/s';
                document.getElementById('humidity').textContent = data.main.humidity + '%';
                document.getElementById('timezone').textContent = `GMT +${data.timezone / 3600}`;
                document.getElementById('pressure').textContent = data.main.pressure + ' hPa';
                document.getElementById('windDirection').textContent = data.wind.deg + '°';
                document.getElementById('uvIndex').textContent = 404; // UV Index may not be available in this API, replace with actual data if available
                document.getElementById('feelsLike').textContent = data.main.feels_like + '°C';
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });

            
        
    });

  

        
    
    