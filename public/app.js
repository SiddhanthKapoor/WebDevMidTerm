const enter = document.getElementById('search');
enter.addEventListener('keydown', function (event) {
    if (event.key === "Enter") {
        setTimeout(getWeather, 1000); // Wait 1 second before calling getWeather
    }
});

async function getWeather() {
    const city = document.getElementById('search').value || 'Bangalore';  // Default city if empty
const url = `/api/weather?city=${city}`;  // Updated to call serverless function

    try {
        const response = await fetch(url); // Fetch weather data
        const data = await response.json(); // Parse JSON response

        console.log('Weather Data:', data); // Log weather data for debugging

        if (!data || data.cod !== 200) {
            console.error('Invalid city or API response:', data);
            return;
        }

        // Extract weather data
        const { main, weather, wind } = data;
        const temp = main.temp - 273.15;
        const minTemp = main.temp_min - 273.15;
        const maxTemp = main.temp_max - 273.15;
        const feelsLike = main.feels_like - 273.15;
        const humidity = main.humidity;
        const windSpeed = wind.speed + " m/s";
        const weatherType = weather[0].main;
        const description = weather[0].description;

        // Update DOM elements
        document.getElementById('finaltemp').textContent = `${Math.ceil(temp)}°C`;
        document.getElementById('d').textContent = weatherType;
        document.getElementById('longdescription').textContent = description.charAt(0).toUpperCase() + description.slice(1);
        document.getElementById('maxtemp').textContent = `Max Temp: ${Math.ceil(maxTemp)}°C`;
        document.getElementById('mintemp').textContent = `Min Temp: ${Math.floor(minTemp)}°C`;
        document.getElementById('feelslike').textContent = `Feels Like: ${Math.floor(feelsLike)}°C`;
        document.getElementById('humidity').textContent = `Humidity: ${humidity}%`;
        document.getElementById('wind').textContent = `Wind Speed: ${windSpeed}`;
        document.getElementById('cityname').textContent = city.charAt(0).toUpperCase() + city.slice(1);

        // Update background based on weather type
        const backgroundMap = {
            "Thunderstorm": "url('https://static.vecteezy.com/system/resources/thumbnails/026/381/045/small_2x/thunder-sky-lights-clouds-generate-ai-photo.jpg')",
            "Fog": "url('https://media.istockphoto.com/id/505644134/photo/smoke-and-fog-background.jpg?s=612x612&w=0&k=20&c=jQ87m7BuZGIPxygbBO33NfOEJu6Lq_wF0s87johPKqs=')",
            "Mist": "url('https://t3.ftcdn.net/jpg/06/86/21/92/360_F_686219293_oZYWOBpbwnXUBzratocdJhGnkH8RBgry.jpg')",
            "Drizzle": "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-heeakM9vBjQXphw1jrMM9X8l3zvex-j72w&s')",
            "Rain": "url('https://wallpapercat.com/w/full/9/5/0/18166-3840x2160-desktop-4k-rain-background-photo.jpg')",
            "Clear": "url('https://images.pexels.com/photos/96622/pexels-photo-96622.jpeg?cs=srgb&dl=pexels-wdnet-96622.jpg&fm=jpg')",
            "Clouds": "url('https://images.unsplash.com/photo-1535557597501-0fee0a500c57?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MjB8fHxlbnwwfHx8fHw%3D')"
        };

        document.body.style.backgroundImage = backgroundMap[weatherType] || '';
    } catch (error) {
        console.error('Error fetching weather data:', error); // Log errors for debugging
    }
}

function updateTimeAndDate() {
    const now = new Date();

    // Time formatting
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert 24-hour time to 12-hour time

    const timeString = `${hours}:${minutes}`;
    document.getElementById('time').innerText = timeString;
    document.getElementById('ampm').innerText = ampm;

    // Date formatting
    const day = now.getDate();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dateString = `${day} ${monthNames[now.getMonth()]}`;
    document.getElementById('date').textContent = dateString;
}

document.addEventListener('DOMContentLoaded', () => {
    updateTimeAndDate();
    setInterval(updateTimeAndDate, 60000); // Update time every minute
    getWeather(); // Fetch initial weather
});
